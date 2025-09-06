"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { toggleFollow } from "@/actions/userAction";


function FollowButton({userId}: {userId: string}) {
	const [isLoading, setIsloading] = useState(false);

	const handleFollow = async () => {
		setIsloading(true)
		try {
			await toggleFollow(userId)
			toast.success("User Followed Successfully")
		} catch (err) {
			console.log("Error in Following Users ", err)
			toast.error("Error in following this user")

		} finally {
			setIsloading(false)
		}
	}
	
	
	return (
		<Button 
		size={"sm"}
		variant={"secondary"}
		onClick={handleFollow}
		disabled={isLoading}
		className="w-20">
			{isLoading ? <Loader2Icon className="size-4 animate-spin"/> : "Follow"}

		</Button>
	)
}

export default FollowButton;
