import ProblemCard from "./ProblemCard"

export default function ProblemList({ problems }) {
    return (
        <table className="table table-striped table-dark">
            <thead>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Difficulty</th>
                </tr>
            </thead>

            <tbody>
                {problems.map((problem, index) => {
                    return (<ProblemCard
                        key={problem._id}
                        title={problem.title}
                        difficulty={problem.difficulty}
                        id={problem._id}
                    />)
                })}
            </tbody>
        </table>
    )

}
