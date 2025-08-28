import style from "./TeamHeader.module.css";

interface TeamMember {
	id: string;
	name: string;
	isActive?: boolean;
}

interface TeamHeaderProps {
	members: TeamMember[];
	activeMemberId: string;
	onMemberSelect: (memberId: string) => void;
}

export default function TeamHeader({
	members,
	activeMemberId,
	onMemberSelect,
}: TeamHeaderProps) {
	return (
		<nav className={style.teamHeader}>
			<div className={style.memberTabs}>
				{members.map((member) => (
					<button
						key={member.id}
						className={`${style.memberTab} ${
							member.id === activeMemberId ? style.active : style.inactive
						}`}
						onClick={() => onMemberSelect(member.id)}>
						{member.name}
					</button>
				))}
			</div>
		</nav>
	);
}
