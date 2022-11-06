import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#E0694A",
    },
    secondary: {
      main: "rgba(0, 0, 0, 0.1)"
    }
  },
  spacing: [0, 4, 8, 16, 24, 32, 64],
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '& .MuiListItemIcon-root': {
            minWidth: "20px",
            marginRight: "8px"
          },
          '& .MuiListItemText-root': {
            display: "flex",
            justifyContent: "flex-start",
            '& .MuiTypography-root': {
              fontSize: "14px",
              fontWeight: "400 !important",
              color: "#696969"
            }
          }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        elevation1: {
          boxShadow: "0px 0px 16px rgba(0,0,0,0.1)"
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          maxWidth: "520px",
          backgroundImage: "inherit",
          borderRadius: "24px",
          padding: "24px 48px"
        }
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: "#353535",
          fontSize: 24,
          fontWeight: 600,
          paddingBottom: 8
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none"
        }
      }
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: 36
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          "&.Mui-disabled.MuiTypography-root": {
            color: "rgba(0, 0, 0, 0.26) !important"
          }
        },
        text: {
          fontSize: "0.9375rem"
        },
        contained: {
          padding: "0.5rem 1.5rem",
          color: "#fff",
          borderRadius: "30px",
          "&:hover": {
            boxShadow: "none"
          }
        },
        containedSecondary: {
          color: "rgba(0, 0, 0, 0.54)"
        },
        outlined: {
          padding: "0.5rem 1.5rem",
          borderRadius: "30px",
          "&:hover": {
            boxShadow: "none"
          },
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        label: {
          color: "rgba(0, 0, 0, 0.6)"
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          paddingLeft: "0px !important",
          paddingRight: "0px !important"
        }
      }
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&::before': {
            borderBottom: "0px !important",
          },
          '&::after': {
            borderBottom: "0px !important",
          }
        },
        input: {
          paddingLeft: "16px !important",
          paddingRight: "16px !important",
          color: "#171A1F",
          '&:-webkit-autofill': {
            borderRadius: "inherit"
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "15px",
          lineHeight: "24px",
          transform: "translate(16px, 16px) scale(1)",
          color: "#9D9FA3",
          marginTop: "0 !important",
        },
        // moved in globals.css for hacky reasons
        shrink: {
          // fontSize: "13px",
          // lineHeight: "18px",
          // transform: "translate(16px, 8px) scale(1)",
          // color: "#71747A"
        }
      }
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& .MuiFilledInput-root': {
            paddingLeft: 16,
            '& .MuiFilledInput-input': {
              lineHeight: "24px",
              padding: "0px",
              paddingTop: "6px",
              paddingBottom: "8px"
            }
          },
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        paragraph: {
          marginBottom: "8px"
        }
      }
    }
  },
  typography: {
    fontFamily: '"Inter", BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif !important;',
    fontWeightMedium: 500,
    button: {
      color: "#fff",
      fontWeight: 400,
      fontSize: "1rem",
      textTransform: "none",
    },
    h2: {
      fontSize: "3.5rem",
    },
    h3: {
      color: "#353535",
      fontSize: 30,
      fontWeight: 600
    },
    h4: {
      color: "#353535",
      fontSize: 24,
      fontWeight: 600
    },
    h5: {
      color: "#353535",
      fontSize: 18,
      fontWeight: 500
    },
    h6: {
      color: "#353535",
      lineHeight: 1.334,
      fontSize: 16,
      fontWeight: 500
    },
    subtitle1: {
      marginTop: "16px",
      lineHeight: 1.5,
      fontWeight: 400,
      color: "#696969"
    },
    subtitle2: {
      marginTop: "14px",
      lineHeight: 1.5,
      fontWeight: 400,
      color: "rgba(0, 0, 0, 0.40)"
    },
    medium: {
      fontWeight: 500
    },
    highlight: {
      fontWeight: 500,
      color: "rgba(0, 0, 0, 0.54)",
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      borderRadius: 4,
      padding: 2
    }
  },
});
