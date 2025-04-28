function Profile({ username, level, points, badges, pointsToNextLevel, handleLogout }) {
  const levelPercent = (points / 100) * 100;

  return (
    <div className="profile-container">
      <h2>👋 Välkommen, {username}!</h2>
      <div className="profile-stats">
        <p><strong>🎮 Nivå:</strong> {level}</p>
        <p><strong>💎 Poäng:</strong> {points} / 100</p>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${levelPercent}%` }}>
        </div>
        </div>
        <p><strong>⬆️ Till nästa nivå:</strong> {pointsToNextLevel} poäng</p>
      </div>
      <div className="profile-badges">
        <h3>🏅 Dina badges</h3>
        {badges.length === 0 ? (
          <p>Inga badges ännu. Keep going! 💪</p>
        ) : (
          <ul>
            {badges.map((badge) => (
              <li key={badge.id}>✨ {badge.text}</li> // Här använder vi badge.id istället för index
            ))}
          </ul>
        )}
      </div>
      <div className="logout-btn-wrapper">
        <button type="button" className="logout-btn" onClick={handleLogout}>
          Logga ut
        </button>
      </div>
      {/* Om du använder <br> så gör den självslutande */}
      <br /> {/* Denna ska nu vara självslutande */}
    </div>
  );
}

export default Profile;
