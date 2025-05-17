import { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	CircularProgress,
	Box,
	Typography,
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

const TodoTableInfiniteScroll = () => {
	const [todos, setTodos] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [itemsToShow, setItemsToShow] = useState(20);

	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/todos")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setTodos(data);
			});
	}, []);

	const fetchMoreData = () => {
		if (itemsToShow >= todos.length) {
			setHasMore(false);
			return;
		}
		setTimeout(() => {
			setItemsToShow((prev) => prev + 20);
		}, 500);
	};

	return (
		<Box
			sx={{
				height: "100vh",
				background: "#f4f6f8",
				display: "flex",
				justifyContent: "center",
				alignItems: "flex-start",
				py: 6,
			}}
		>
			<Box
				sx={{
					width: 800,
					background: "#fff",
					boxShadow: 3,
					borderRadius: 3,
					p: 4,
				}}
			>
				<Typography
					variant="h4"
					component="h2"
					align="center"
					gutterBottom
					sx={{ fontWeight: "bold", color: "#333" }}
				>
					Dummy Data Table
				</Typography>

				<InfiniteScroll
					dataLength={Math.min(itemsToShow, todos.length)}
					next={fetchMoreData}
					hasMore={hasMore}
					loader={
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								py: 2,
							}}
						>
							<CircularProgress />
						</Box>
					}
					height={600}
					endMessage={
						<Typography
							align="center"
							sx={{ py: 2, color: "text.secondary" }}
						>
							<b>Yay! You have seen it all.</b>
						</Typography>
					}
				>
					<TableContainer component={Paper} elevation={0}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell sx={{ fontWeight: "bold" }}>
										ID
									</TableCell>
									<TableCell sx={{ fontWeight: "bold" }}>
										Title
									</TableCell>
									<TableCell sx={{ fontWeight: "bold" }}>
										Completed
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{todos.slice(0, itemsToShow).map((todo) => (
									<TableRow key={todo.id}>
										<TableCell>{todo.id}</TableCell>
										<TableCell>{todo.title}</TableCell>
										<TableCell>
											{todo.completed ? "Yes" : "No"}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</InfiniteScroll>
			</Box>
		</Box>
	);
};

export default TodoTableInfiniteScroll;
