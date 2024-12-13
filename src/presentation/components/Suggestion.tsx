import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Link,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import CodeIcon from "@mui/icons-material/Code";
import { SuggestionsEntity } from "domain/entities/SuggestionsEntity";
import React from "react";

interface SuggestionProps {
  suggestion: SuggestionsEntity;
}

export const Suggestion: React.FC<SuggestionProps> = ({ suggestion }) => {
  return (
    <Card
      sx={{ maxWidth: 800, width: "100%", borderRadius: "20px 20px 20px 0" }}
    >
      <CardContent>
        <Grid2 container spacing={2} direction="column">
          <Grid2 xs={12}>
            <Typography variant="h5" gutterBottom>
              {suggestion.name}
            </Typography>
          </Grid2>
          <Grid2 xs={12}>
            <Typography variant="subtitle1" color="text.secondary">
              {suggestion.description}
            </Typography>
          </Grid2>
          <Grid2>
            <Typography variant="subtitle1">
              <strong>Autor:</strong> {suggestion.owner}
            </Typography>
          </Grid2>
          <Grid2 xs={12}>
            <Typography variant="subtitle1">
              <strong>Estrelas:</strong> {suggestion.stars}
            </Typography>
          </Grid2>
          <Grid2 xs={12}>
            <Typography variant="subtitle1">
              <strong>Linguagens:</strong>{" "}
              <Stack direction="row" spacing={1}>
                {suggestion.languages.map((lang) => (
                  <Chip key={lang} label={lang} icon={<CodeIcon />} />
                ))}
              </Stack>
            </Typography>
          </Grid2>

          <Grid2 xs={12}>
            <Typography variant="subtitle1">
              <strong>Link:</strong>{" "}
              <Link href={suggestion.url} target="_blank" color="primary.main">
                {suggestion.url}
              </Link>
            </Typography>
          </Grid2>
          <Grid2 xs={12}>
            <Typography variant="h6" gutterBottom>
              Curiosidade
            </Typography>
          </Grid2>
          <Grid2 xs={12}>
            <Typography variant="body2" color="text.secondary">
              {suggestion.curiosity}
            </Typography>
          </Grid2>
          <Grid2 xs={12}>
            <Typography variant="h6" gutterBottom>
              Você Sabia?
            </Typography>
          </Grid2>
          <Grid2 xs={12}>
            <Typography variant="body2" color="text.secondary">
              {suggestion.youKnew}
            </Typography>
          </Grid2>
          <Grid2 xs={12}>
            <Typography variant="h6" gutterBottom>
              Sugestão de Integração
            </Typography>
          </Grid2>
          <Grid2 xs={12}>
            <Typography variant="body2" color="text.secondary">
              {suggestion.integration}
            </Typography>
          </Grid2>
          <Grid2 mt={2} mb={1} xs={12}>
            <Typography variant="h6">Exemplos LLM</Typography>
          </Grid2>
          <Grid2 xs={12}>
            <Grid2 container direction="column" spacing={2} flexWrap="nowrap">
              {suggestion.llm.map((item, index) => (
                <Grid2 container spacing={2} key={index}>
                  <Grid2 xs={12}>
                    <Grid2 container direction="column" spacing={2}>
                      <Grid2>
                        <Typography variant="subtitle1" gutterBottom>
                          <b>Uso do Padrão:</b>
                        </Typography>
                      </Grid2>
                      <Grid2 pl={2}>
                        <Typography variant="body2" gutterBottom>
                          {item.pattern_usage}
                        </Typography>
                      </Grid2>
                    </Grid2>
                  </Grid2>
                  <Grid2 xs={12}>
                    <Grid2 container direction="column" spacing={2}>
                      <Grid2>
                        <Typography variant="subtitle1" gutterBottom>
                          <b>Aplicação no Mundo Real:</b>
                        </Typography>
                      </Grid2>
                      <Grid2 pl={2}>
                        <Typography variant="body2" gutterBottom>
                          {item.real_world_application}
                        </Typography>
                      </Grid2>
                    </Grid2>
                  </Grid2>

                  <Grid2 xs={12}>
                    <Grid2
                      container
                      direction="column"
                      spacing={2}
                      flexWrap="nowrap"
                    >
                      <Grid2>
                        <Typography variant="subtitle1" gutterBottom>
                          <strong>Exemplo de Código:</strong>
                        </Typography>
                      </Grid2>
                      <Grid2 pl={2}>
                        <Typography
                          variant="body2"
                          component="pre"
                          sx={{ whiteSpace: "pre-wrap" }}
                        >
                          <pre>{item.example_code}</pre>
                        </Typography>
                      </Grid2>
                    </Grid2>
                  </Grid2>
                </Grid2>
              ))}
            </Grid2>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
};
