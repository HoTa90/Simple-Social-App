import { getProfileByUsername, getUserLikedPosts, getUserPosts, isFollowing } from "@/actions/profileActions";
import { getDbUserId } from "@/actions/userAction";
import ProfilePageClient from "@/components/ProfilePageClient";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { username: string } }) {
	const user = await getProfileByUsername(params.username);
	if (!user) return;

	return {
		title: `${user.name ?? user.username}`,
		description: user.bio || `Check out ${user.username}'s profile.`,
	};
}

async function ProfilePageServer({ params }: { params: { username: string } }) {
	const user = await getProfileByUsername(params.username);
	if (!user) {
		notFound();
	}
	const viewerDbId = await getDbUserId();

	const [posts, likedPosts, isCurrentlyFollowing] = await Promise.all([
		getUserPosts(user.id),
		getUserLikedPosts(user.id),
		isFollowing(user.id),
	]);

	return <ProfilePageClient 
	user= {user}
	posts= {posts}
	likedPosts={likedPosts}
	isFollowing={isCurrentlyFollowing}
	viewerId={viewerDbId}
	/>;
}

export default ProfilePageServer;
