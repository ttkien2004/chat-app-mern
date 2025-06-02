import { Button } from "primereact/button";

const PeopleList = () => {
	const list = [
		{
			name: "kien",
		},
		{
			name: "Tran",
		},
		{
			name: "trunes",
		},
	];
	return (
		<div>
			<div style={{ fontSize: "30px", marginBottom: "30px" }}>
				Other friends
			</div>
			<div>
				{list.map((member, i) => (
					<div
						key={i}
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "10px",
						}}
					>
						<div style={{ display: "flex", alignItems: "center" }}>
							<div
								style={{
									height: "40px",
									width: "40px",
									borderRadius: "50%",
									border: "1px solid red",
									marginRight: "10px",
								}}
							></div>
							<div>{member.name}</div>
						</div>
						<div>
							<Button label="Add friend"></Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default PeopleList;
