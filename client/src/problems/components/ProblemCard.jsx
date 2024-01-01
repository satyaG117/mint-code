import { Link } from "react-router-dom";

import './ProblemCard.css'

const difficultyColorMap = {
    'easy': 'success',
    'medium': 'warning',
    'hard': 'danger'
}

export default function ProblemCard({ title, difficulty, id }) {
    return (
        <tr>

            <td><Link to={`/problems/${id}`} className="problem-card-link">{title}
            </Link></td>
            <td style={{textTransform : 'capitalize'}}><div className={`badge text-bg-${difficultyColorMap[difficulty]}`}>{difficulty}</div></td>
        </tr>


    )
}
