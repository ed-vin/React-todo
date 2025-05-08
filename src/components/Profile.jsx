function Profile({ username, level, points, badges, pointsToNextLevel, handleLogout }) {
  const levelPercent = (points / 100) * 100;

  return (
    <div className="profile-container">
      <h2>👋 Welcome, {username}!</h2>
      <div className="profile-stats">
        <p><strong>🎮 Level:</strong> {level}</p>
        <p><strong>💎 Score:</strong> {points} / 100</p>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${levelPercent}%` }}>
        </div>
        </div>
        <p><strong>⬆️ To next Level:</strong> {pointsToNextLevel} poäng</p>
      </div>
      <div className="profile-badges">
        <h3>🏅 Badges</h3>
        {badges.length === 0 ? (
          <p>No badges yet... Keep going! 💪</p>
        ) : (
          <ul>
            {badges.map((badge) => (
              <li key={badge.id}>✨ {badge.text}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="logout-btn-wrapper">
        <button type="button" className="logout-btn" onClick={handleLogout}>
          Logg out
        </button>
      </div>
      <br />
    </div>
  );
}

export default Profile;
