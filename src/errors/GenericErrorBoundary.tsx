import { Component, ErrorInfo, memo, ReactNode } from "react";
import { Typography, Button } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class GenericErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.info("Uncaught error:", error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Grid2
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
          textAlign="center"
          spacing={3}
        >
          <Grid2>
            <Typography variant="h4" gutterBottom>
              Alguma coisa deu errado
            </Typography>
          </Grid2>
          <Grid2>
            <Typography variant="body1" gutterBottom>
              Um erro inesperado ocorreu. Por favor, tente novamente mais tarde.
            </Typography>
          </Grid2>
          <Grid2 pt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleReload}
            >
              Recarregar
            </Button>
          </Grid2>
        </Grid2>
      );
    }

    return this.props.children;
  }
}

export default memo(GenericErrorBoundary);
