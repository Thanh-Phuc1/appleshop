function Card(theme) {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          position: "relative",
          borderRadius: 4,
          zIndex: 0,
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: "h5" },
        subheaderTypographyProps: {
          variant: "body2",
          marginTop: theme.spacing(0.5),
        },
      },
      styleOverrides: {
        root: {
          padding: theme.spacing(3, 3, 0),
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3),
        },
      },
    },
    MuicardMedia: {
      textTransform: "capitalize",
      "&.Mui-selected": {
        color: theme.palette.text.primary,
      },
      "&:not(:last-of-type)": {
        marginRight: theme.spacing(5),
      },
      "@media (min-width: 600px)": {
        minWidth: 48,
        maxHeight: "40px",
      },
    },
  };
}

export default Card;
