import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
	return (
		<div>
			<SignedOut>
				<SignInButton mode="modal">
					<button className="bg-red-500 rounded-xl p-1">
						Sign In
					</button>
				</SignInButton>
			</SignedOut>
			<SignedIn>
				<UserButton />
			</SignedIn>
		</div>
	);
}
