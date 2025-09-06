"use server";

import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function syncUser() {
	try {
		const { userId } = await auth();
		const user = await currentUser();

		if (!userId || !user) return;

		const existingUser = await prisma.user.findUnique({
			where: {
				clerkId: userId,
			},
		});

		if (existingUser) {
			return existingUser;
		}

		const dbUser = await prisma.user.create({
			data: {
				clerkId: userId,
				name: `${user.firstName || ""} ${user.lastName || ""}`,
				username: user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
				email: user.emailAddresses[0].emailAddress,
				image: user.imageUrl,
			},
		});

		return dbUser;
	} catch (err) {
		console.log("Error in syncUser ", err);
	}
}

export async function getUser(clerkId: string) {
	return prisma.user.findUnique({
		where: {
			clerkId,
		},
		include: {
			_count: {
				select: {
					followers: true,
					following: true,
					posts: true,
				},
			},
		},
	});
}

export async function getDbUserId() {
	// only fetches user.id from db
	const { userId: clerkId } = await auth();
	if (!clerkId) {
		throw new Error("You are unauthenticated!");
	}

	const user = await prisma.user.findUnique({
		where: { clerkId },
		select: { id: true },
	});

	if (!user) {
		throw new Error("User not found in db");
	}

	return user.id;
}

export async function getSuggestUsers() {
	// get 3 random users
	try {
		const userId = await getDbUserId();

		const randomUsers = await prisma.user.findMany({
			where: {
				AND: [
					{ NOT: { id: userId } },
					{
						NOT: {
							followers: {
								some: {
									followerId: userId,
								},
							},
						},
					},
				],
			},
			select: {
				id: true,
				name: true,
				username: true,
				image: true,
				_count: {
					select: {
						followers: true,
					},
				},
			},
			take: 3,
		});

		return randomUsers;
	} catch (err) {
		console.log("Error fetchign random users ", err);
		return [];
	}
}

export async function toggleFollow(targetUserId: string) {
	try {
		const userId = await getDbUserId();

		if (userId === targetUserId) {
			throw new Error("Cant Follow yourself");
		}

		const existingFollow = await prisma.follows.findUnique({
			where: {
				followerId_followingId: {
					followerId: userId,
					followingId: targetUserId,
				},
			},
		});

		if (existingFollow) {
			//unfollow
			await prisma.follows.delete({
				where: {
					followerId_followingId: {
						followerId: userId,
						followingId: targetUserId,
					},
				},
			});
		} else {
			//follow
			await prisma.$transaction([
				prisma.follows.create({
					data: {
						followerId: userId,
						followingId: targetUserId,
					},
				}),
				prisma.notification.create({
					data: {
						type: "FOLLOW",
						userId: targetUserId, // who is being followed
						creatorId: userId, // user that is following
					},
				}),
			]);
		}
		revalidatePath("/");
		return { success: true };
	} catch (err) {
		console.log("Error in toggleFollow ", err);
		return { success: false, error: "Error in togglefollow" };
	}
}
