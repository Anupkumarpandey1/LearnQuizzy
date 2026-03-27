function LeaderboardTable({ entries }) {
  if (entries.length === 0) {
    return (
      <p style={{ textAlign: 'center', color: '#999', marginTop: '40px' }}>
        No attempts yet. Be the first!
      </p>
    );
  }

  return (
    <table className="leaderboard-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Player</th>
          <th>Score</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry, idx) => (
          <tr key={entry._id}>
            <td>
              {idx === 0 && '🥇'}
              {idx === 1 && '🥈'}
              {idx === 2 && '🥉'}
              {idx > 2 && `#${idx + 1}`}
            </td>
            <td>{entry.playerName}</td>
            <td>{entry.score}/{entry.totalQuestions}</td>
            <td>
              {Math.floor(entry.timeTaken / 60)}:{(entry.timeTaken % 60).toString().padStart(2, '0')}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default LeaderboardTable;
