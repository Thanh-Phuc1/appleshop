import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Box, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import Profile from "../../features/user/ProfileForm";
import UpdatePassword from "../../features/user/PasswordForm";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState("Thông tin");
  const [showProfile, setShowProfile] = useState(true);
  const navigate = useNavigate();

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  const PROFILE_TABS = [
    {
      value: "Thông tin",
      component: <Profile profile={user} />,
    },
  ];

  return (
    <Stack sx={{ backgroundColor: "white", height: "100%" }}>
      <Grid
        container
        sx={{
          marginTop: 12,
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <Grid item xs={12} md={2}>
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
            }}
            onClick={() => setShowProfile(true)}
          >
            <Typography sx={{ marginLeft: 14 }}>
              <HomeIcon
                onClick={() => navigate("/")}
                sx={{ fontSize: { xs: "20px", md: "40px" } }}
              />
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          {showProfile && (
            <Box
              sx={{
                mt: 3,
              }}
            >
              <Tabs
                value={currentTab}
                variant="scrollable"
                allowScrollButtonsMobile
                onChange={(e, value) => handleChangeTab(value)}
                sx={{
                  bgcolor: "white",
                  width: "100%",
                  orientation: { xs: "vertical", md: "vertical" },
                }}
              >
                {PROFILE_TABS.map((tab) => (
                  <Tab
                    sx={{
                      display: "flex",
                      fontSize: { xs: "0.6rem", md: "0.8rem" },
                    }}
                    disableRipple
                    key={tab.value}
                    value={tab.value}
                    label={tab.value}
                  />
                ))}
              </Tabs>
            </Box>
          )}
          {PROFILE_TABS.map((tab) => {
            const isMatched = tab.value === currentTab;
            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
          })}
        </Grid>
      </Grid>
      <Box
        sx={{
          mt: 3,
          marginLeft: 12,
        }}
      >
        <UpdatePassword />
      </Box>
    </Stack>
  );
}

export default ProfilePage;
