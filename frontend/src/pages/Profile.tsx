import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState<any>(null);
  const [checkin, setCheckin] = useState<any>(null);
  const [previousCheckin, setPreviousCheckin] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [checkinLoading, setCheckinLoading] = useState(true);

  useEffect(() => {
    const getProfileAndCheckins = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/login";
        return;
      }

      try {
        // Get logged-in user
        const profileResponse = await fetch(
          "http://localhost:5000/api/users/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const profileData = await profileResponse.json();

        if (!profileResponse.ok) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
          return;
        }

        setUser(profileData.user);

        // Get ALL check-ins of this user
        const checkinResponse = await fetch(
          `http://localhost:5000/api/checkins/user/${profileData.user.id}`
        );

        if (checkinResponse.ok) {
          const checkinData = await checkinResponse.json();

          const checkins = checkinData.checkins || [];

          // Backend sends newest first
          if (checkins.length >= 1) {
            setCheckin(checkins[0]);
          }

          // Second newest = previous check-in
          if (checkins.length >= 2) {
            setPreviousCheckin(checkins[1]);
          }
        } else {
          setCheckin(null);
          setPreviousCheckin(null);
        }

      } catch (error) {
        console.error("Profile/check-in error:", error);
        alert("Unable to connect to the server");
      } finally {
        setLoading(false);
        setCheckinLoading(false);
      }
    };

    getProfileAndCheckins();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>Loading profile...</h2>
      </div>
    );
  }

  // Calculate current total score
  const currentTotal = checkin
    ? Number(checkin.academic_score || 0) +
      Number(checkin.relationship_score || 0) +
      Number(checkin.stress_score || 0) +
      Number(checkin.sleep_score || 0) +
      Number(checkin.confidence_score || 0)
    : 0;

  // Calculate previous total score
  const previousTotal = previousCheckin
    ? Number(previousCheckin.academic_score || 0) +
      Number(previousCheckin.relationship_score || 0) +
      Number(previousCheckin.stress_score || 0) +
      Number(previousCheckin.sleep_score || 0) +
      Number(previousCheckin.confidence_score || 0)
    : 0;

  const scoreDifference = currentTotal - previousTotal;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #eef7f2, #dff3e8)",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          margin: "0 auto",
          background: "#ffffff",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              margin: "0 0 10px",
              color: "#1f6f4a",
            }}
          >
            Welcome Back, {user?.name}
          </h1>

          <p style={{ color: "#666" }}>
            Your Thrive profile and wellbeing history
          </p>
        </div>

        {/* ACCOUNT DETAILS */}

        <h2 style={sectionTitleStyle}>Account Details</h2>

        <div style={infoBoxStyle}>
          <strong>Name</strong>
          <p>{user?.name}</p>
        </div>

        <div style={infoBoxStyle}>
          <strong>Email</strong>
          <p>{user?.email}</p>
        </div>

        <div style={infoBoxStyle}>
          <strong>User ID</strong>
          <p>{user?.id}</p>
        </div>

        <div style={infoBoxStyle}>
          <strong>Account Created</strong>
          <p>
            {new Date(user?.created_at).toLocaleString()}
          </p>
        </div>

        {/* PREVIOUS CHECK-IN */}

        <div style={{ marginTop: "30px" }}>
          <h2 style={sectionTitleStyle}>
            Your Previous Check-In
          </h2>

          {checkinLoading ? (
            <div style={infoBoxStyle}>
              <p>Loading your previous check-in...</p>
            </div>
          ) : checkin ? (
            <div
              style={{
                background: "#f7faf8",
                padding: "20px",
                borderRadius: "14px",
                border: "1px solid #dceee4",
              }}
            >
              <p
                style={{
                  marginTop: 0,
                  color: "#777",
                  fontSize: "14px",
                }}
              >
                Latest check-in:{" "}
                {new Date(checkin.created_at).toLocaleString()}
              </p>

              <div
                style={{
                  background: "#e8f5ed",
                  padding: "15px",
                  borderRadius: "10px",
                  marginBottom: "15px",
                }}
              >
                <strong style={{ color: "#1f6f4a" }}>
                  Primary Concern
                </strong>

                <p
                  style={{
                    margin: "6px 0 0",
                    fontSize: "18px",
                    fontWeight: "600",
                  }}
                >
                  {checkin.primary_category || "Not available"}
                </p>
              </div>

              {checkin.secondary_category && (
                <div
                  style={{
                    background: "#f0f7f3",
                    padding: "15px",
                    borderRadius: "10px",
                    marginBottom: "20px",
                  }}
                >
                  <strong style={{ color: "#1f6f4a" }}>
                    Secondary Concern
                  </strong>

                  <p
                    style={{
                      margin: "6px 0 0",
                      fontSize: "17px",
                      fontWeight: "600",
                    }}
                  >
                    {checkin.secondary_category}
                  </p>
                </div>
              )}

              <h3 style={{ color: "#333" }}>
                Latest Scores
              </h3>

              <ScoreRow
                label="Academic Pressure"
                score={checkin.academic_score}
              />

              <ScoreRow
                label="Relationships & Friendship"
                score={checkin.relationship_score}
              />

              <ScoreRow
                label="Stress & Overwhelm"
                score={checkin.stress_score}
              />

              <ScoreRow
                label="Sleep & Rest"
                score={checkin.sleep_score}
              />

              <ScoreRow
                label="Confidence & Self-Esteem"
                score={checkin.confidence_score}
              />

              {/* COMPARISON */}

              {previousCheckin && (
                <div
                  style={{
                    marginTop: "30px",
                    padding: "20px",
                    borderRadius: "14px",
                    background: "#ffffff",
                    border: "1px solid #dceee4",
                  }}
                >
                  <h2
                    style={{
                      color: "#1f6f4a",
                      marginTop: 0,
                    }}
                  >
                    Progress Since Your Last Check-In
                  </h2>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "15px",
                      marginBottom: "20px",
                    }}
                  >
                    <div style={comparisonBoxStyle}>
                      <span>Previous Score</span>
                      <strong>{previousTotal}/40</strong>
                    </div>

                    <div style={comparisonBoxStyle}>
                      <span>Current Score</span>
                      <strong>{currentTotal}/40</strong>
                    </div>
                  </div>

                  {scoreDifference < 0 && (
                    <div
                      style={{
                        padding: "18px",
                        borderRadius: "12px",
                        background: "#e8f5ed",
                        textAlign: "center",
                      }}
                    >
                      <h3
                        style={{
                          color: "#1f6f4a",
                          marginTop: 0,
                        }}
                      >
                        You have improved! 🎉
                      </h3>

                      <p style={{ marginBottom: 0 }}>
                        Your overall score decreased from{" "}
                        <strong>{previousTotal}/40</strong> to{" "}
                        <strong>{currentTotal}/40</strong>.
                        This suggests you are experiencing fewer
                        difficulties than during your previous check-in.
                      </p>
                    </div>
                  )}

                  {scoreDifference > 0 && (
                    <div
                      style={{
                        padding: "18px",
                        borderRadius: "12px",
                        background: "#fff4e5",
                        textAlign: "center",
                      }}
                    >
                      <h3
                        style={{
                          color: "#9a6700",
                          marginTop: 0,
                        }}
                      >
                        You may need some extra support
                      </h3>

                      <p style={{ marginBottom: 0 }}>
                        Your overall score increased from{" "}
                        <strong>{previousTotal}/40</strong> to{" "}
                        <strong>{currentTotal}/40</strong>.
                        Consider taking some time to look after your
                        wellbeing and explore the support available on Thrive.
                      </p>
                    </div>
                  )}

                  {scoreDifference === 0 && (
                    <div
                      style={{
                        padding: "18px",
                        borderRadius: "12px",
                        background: "#f0f7f3",
                        textAlign: "center",
                      }}
                    >
                      <h3
                        style={{
                          color: "#1f6f4a",
                          marginTop: 0,
                        }}
                      >
                        Your score is unchanged
                      </h3>

                      <p style={{ marginBottom: 0 }}>
                        Your overall score is the same as your previous
                        check-in at <strong>{currentTotal}/40</strong>.
                      </p>
                    </div>
                  )}

                  {/* CATEGORY COMPARISON */}

                  <h3
                    style={{
                      marginTop: "25px",
                      color: "#333",
                    }}
                  >
                    Category Comparison
                  </h3>

                  <ComparisonRow
                    label="Academic Pressure"
                    previous={previousCheckin.academic_score}
                    current={checkin.academic_score}
                  />

                  <ComparisonRow
                    label="Relationships & Friendship"
                    previous={previousCheckin.relationship_score}
                    current={checkin.relationship_score}
                  />

                  <ComparisonRow
                    label="Stress & Overwhelm"
                    previous={previousCheckin.stress_score}
                    current={checkin.stress_score}
                  />

                  <ComparisonRow
                    label="Sleep & Rest"
                    previous={previousCheckin.sleep_score}
                    current={checkin.sleep_score}
                  />

                  <ComparisonRow
                    label="Confidence & Self-Esteem"
                    previous={previousCheckin.confidence_score}
                    current={checkin.confidence_score}
                  />
                </div>
              )}

              {!previousCheckin && (
                <div
                  style={{
                    marginTop: "25px",
                    padding: "18px",
                    borderRadius: "12px",
                    background: "#f0f7f3",
                    textAlign: "center",
                  }}
                >
                  <h3 style={{ color: "#1f6f4a" }}>
                    This is your first check-in
                  </h3>

                  <p style={{ color: "#666" }}>
                    Complete another check-in later to see how your
                    wellbeing has changed over time.
                  </p>
                </div>
              )}

              <button
                onClick={() => {
                  window.location.href = "/check-in";
                }}
                style={{
                  width: "100%",
                  padding: "13px",
                  marginTop: "20px",
                  border: "none",
                  borderRadius: "10px",
                  background: "#1f6f4a",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Take Check-In Again
              </button>
            </div>
          ) : (
            <div
              style={{
                background: "#f7faf8",
                padding: "20px",
                borderRadius: "14px",
                textAlign: "center",
              }}
            >
              <h3 style={{ color: "#1f6f4a" }}>
                No Previous Check-In
              </h3>

              <p style={{ color: "#666" }}>
                You haven't completed a wellbeing check-in yet.
              </p>

              <button
                onClick={() => {
                  window.location.href = "/check-in";
                }}
                style={{
                  padding: "12px 20px",
                  border: "none",
                  borderRadius: "10px",
                  background: "#1f6f4a",
                  color: "white",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Start Your First Check-In
              </button>
            </div>
          )}
        </div>

        {/* LOGOUT */}

        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "13px",
            marginTop: "30px",
            border: "1px solid #1f6f4a",
            borderRadius: "10px",
            background: "white",
            color: "#1f6f4a",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}


function ScoreRow({
  label,
  score,
}: {
  label: string;
  score: number;
}) {
  const percentage = Math.min((Number(score) / 8) * 100, 100);

  return (
    <div style={{ marginBottom: "16px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "6px",
          fontSize: "14px",
        }}
      >
        <span>{label}</span>
        <strong>{score}/8</strong>
      </div>

      <div
        style={{
          width: "100%",
          height: "8px",
          background: "#e5e5e5",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${Math.min((Number(score) / 8) * 100, 100)}%`,
            height: "100%",
            background: "#1f6f4a",
            borderRadius: "10px",
          }}
        />
      </div>
    </div>
  );
}


function ComparisonRow({
  label,
  previous,
  current,
}: {
  label: string;
  previous: number;
  current: number;
}) {
  const previousScore = Number(previous || 0);
  const currentScore = Number(current || 0);
  const difference = currentScore - previousScore;

  let status = "No change";

  if (difference < 0) {
    status = "Improved";
  } else if (difference > 0) {
    status = "Increased";
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 0",
        borderBottom: "1px solid #eeeeee",
        gap: "10px",
      }}
    >
      <span style={{ flex: 1 }}>{label}</span>

      <span>
        {previousScore} → {currentScore}
      </span>

      <strong
        style={{
          minWidth: "70px",
          textAlign: "right",
          color:
            difference < 0
              ? "#1f6f4a"
              : difference > 0
              ? "#9a6700"
              : "#666",
        }}
      >
        {status}
      </strong>
    </div>
  );
}


const sectionTitleStyle = {
  color: "#1f6f4a",
  marginBottom: "15px",
};

const infoBoxStyle = {
  background: "#f7faf8",
  padding: "12px 15px",
  borderRadius: "10px",
  marginBottom: "12px",
  color: "#333",
};

const comparisonBoxStyle = {
  flex: 1,
  background: "#f7faf8",
  padding: "15px",
  borderRadius: "10px",
  textAlign: "center" as const,
  display: "flex",
  flexDirection: "column" as const,
  gap: "6px",
};


export default Profile;