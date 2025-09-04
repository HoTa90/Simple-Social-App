import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
	return (
		<div className="m-4">
			<SignedOut>
				<SignInButton mode="modal">
					<Button>Sign In</Button>
				</SignInButton>
			</SignedOut>
			<SignedIn>
				<UserButton />
			</SignedIn>
					<Button variant={"secondary"}>Second button</Button>
		</div>
	);
}
