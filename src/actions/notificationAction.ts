"use server";

import prisma from "@/lib/prisma";
import { getDbUserId } from "./userAction";

export async function getNotifications() {
	try {
		const userId = await getDbUserId();
		if (!userId) return [];

		const notifications = await prisma.notification.findMany({
			where: {
				userId,
			},
			include: {
				creator: {
					select: {
						id: true,
						name: true,
						username: true,
						image: true,
					},
				},
				post: {
					select: {
						id: true,
						content: true,
						image: true,
					},
				},
				comment: {
					select: {
						id: true,
						content: true,
						createdAt: true,
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		return notifications;
	} catch (err) {
		console.log("Error in getNotifications: ", err);
		throw new Error("Failed to get notifications");
	}
}

export async function markAsRead(notificationIds: string[]) {
	try {
		await prisma.notification.updateMany({
			where: {
				id: {
					in: notificationIds,
				},
			},
			data: {
				read: true,
			},
		});

		return { success: true };
	} catch (err) {
		console.log("Failed to mark as read ", err);
		return { success: false };
	}
}
