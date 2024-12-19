import { Typography, Chip, Link, Card, CardContent } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import CodeIcon from "@mui/icons-material/Code";
import StarIcon from "@mui/icons-material/Star";
import { RepositoryEntity } from "domain/entities/RepositoryEntity";
import GenericErrorBoundary from "errors/GenericErrorBoundary";
import ForkRightIcon from "@mui/icons-material/ForkRight";

export default function Repository({
  repository,
}: {
  repository: RepositoryEntity;
}) {
  return (
    <GenericErrorBoundary>
      <Card
        sx={{ maxWidth: 800, width: "100%", borderRadius: "20px 20px 20px 0" }}
      >
        <CardContent>
          <Grid2
            container
            spacing={2}
            direction="column"
            justifyContent="flex-start"
          >
            <Grid2>
              <Typography
                variant="subtitle1"
                color="primary"
                textAlign="start"
                fontSize={20}
                fontWeight="bold"
              >
                {repository.name}
              </Typography>
            </Grid2>
            <Grid2 xs>
              <Link
                href={repository.html_url}
                target="_blank"
                underline="hover"
              >
                <Typography variant="subtitle1" color="primary">
                  {repository.full_name}
                </Typography>
              </Link>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ mt: 0.5, mb: 1 }}
              >
                {repository.description || "No description available."}
              </Typography>
              <Grid2 container spacing={1}>
                <Grid2>
                  <Chip
                    icon={<StarIcon fontSize="small" />}
                    label={repository.stargazers_count}
                    size="small"
                    color="warning"
                  />
                </Grid2>
                <Grid2>
                  <Chip
                    icon={<ForkRightIcon fontSize="small" />}
                    label={repository.forks_count}
                    size="small"
                    color="default"
                  />
                </Grid2>
                {repository.language &&
                  [repository.language]?.map((language) => (
                    <Grid2>
                      <Chip
                        icon={<CodeIcon fontSize="small" />}
                        label={language}
                        size="small"
                        color="primary"
                      />
                    </Grid2>
                  ))}
              </Grid2>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    </GenericErrorBoundary>
  );
}
