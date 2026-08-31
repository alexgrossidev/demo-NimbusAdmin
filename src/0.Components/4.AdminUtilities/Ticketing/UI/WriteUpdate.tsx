import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Stack,
  Chip,
  IconButton,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SendIcon from "@mui/icons-material/Send";
import type {
  CreateTicket,
  TicketingForm,
} from "../Interfaces/ticketing.schema";
import type { UseFormResult } from "@/5.Utils/1.Hooks/form/useForm";
interface TicketManagerProps {
  form: UseFormResult<TicketingForm>;
}

export default function SubmitTicketManager({ form }: TicketManagerProps) {
  // Legge la lista di staging dallo stato del form principale
  const tickets = form.getFieldValue("tickets") || [];

  // Stati locali per la bozza correnti corrispondenti ai valori di default richiesti
  const [draftType, setDraftType] = useState<CreateTicket["type"]>("bug");
  const [draftPriority, setDraftPriority] =
    useState<CreateTicket["priority"]>("low");
  const [draftSource, setDraftSource] =
    useState<CreateTicket["source"]>("customer");
  const [draftTitle, setDraftTitle] = useState("");
  const [draftDescription, setDraftDescription] = useState("");

  // Require a title and a description before a ticket can be staged.
  const isDraftValid =
    draftTitle.trim().length > 2 && draftDescription.trim().length > 5;

  // Aggiunge il ticket all'array di staging temporaneo
  const handleAddTicket = () => {
    if (!isDraftValid) return;

    const newTicket: CreateTicket = {
      type: draftType,
      priority: draftPriority,
      source: draftSource,
      title: draftTitle.trim(),
      description: draftDescription.trim(),
      createdById: 0,
    };

    form.setFieldValue("tickets", [...tickets, newTicket]);

    // Ripristina i valori di default più sicuri in assoluto
    setDraftTitle("");
    setDraftDescription("");
    setDraftType("bug");
    setDraftPriority("low");
    setDraftSource("customer");
  };

  const handleRemoveTicket = (indexToRemove: number) => {
    const updatedTickets = tickets.filter(
      (_, index) => index !== indexToRemove,
    );
    form.setFieldValue("tickets", updatedTickets);
  };

  // Badge visivi ultra-chiari per l'anteprima lato team di Sviluppo
  const getPriorityBadge = (priority: CreateTicket["priority"]) => {
    switch (priority) {
      case "high":
        return { label: "🔥 PRIORITÀ ALTA", color: "error" as const };
      case "medium":
        return { label: "⚡ Media", color: "warning" as const };
      case "low":
        return { label: "☕ Bassa", color: "info" as const };
    }
  };

  const getTypeBadge = (type: CreateTicket["type"]) => {
    switch (type) {
      case "bug":
        return { label: "🐛 Qualcosa è Rotto", color: "error" as const };
      case "feature_request":
        return {
          label: "✨ Richiesta Funzionalità",
          color: "success" as const,
        };
      case "support":
        return { label: "🔧 Task Generale", color: "default" as const };
    }
  };

  return (
    <Box sx={{ p: 4, width: "100%", maxWidth: "1400px", margin: "0 auto" }}>
      {/* BANNER DI INTESTAZIONE */}
      <Box
        sx={{
          mb: 5,
          bgcolor: "primary.main",
          color: "primary.contrastText",
          p: 3.5,
          borderRadius: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            📥 Pipeline Customer Care ➔ Devs
          </Typography>
          <Typography variant="body1">
            Crea uno o più ticket qui sotto. Quando hai finito, clicca sul
            grande bottone verde a destra per inviarli ai nostri splendidi
            sviluppatori.
          </Typography>
        </Box>

      </Box>

      <Grid container spacing={5}>
        {/* COLONNA SINISTRA: Il modulo di inserimento a prova di errore */}
        <Grid size={6}>
          <Card variant="outlined" sx={{ p: 4, borderRadius: 2, boxShadow: 2 }}>
            <Typography
              variant="h5"
              sx={{ mb: 4, fontWeight: 700, color: "text.primary" }}
            >
              Fase 1: Descrivi il Problema
            </Typography>

            <Stack spacing={3.5}>
              {/* 1. SELETTORE SORGENTE (Grandi pulsanti intuitivi) */}
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1.5, fontWeight: 600, color: "text.secondary" }}
                >
                  Chi si è lamentato di questo problema?
                </Typography>
                <ToggleButtonGroup
                  value={draftSource}
                  exclusive
                  onChange={(_, value) => value && setDraftSource(value)}
                  fullWidth
                  color="primary"
                >
                  <ToggleButton value="customer" sx={{ py: 1.5 }}>
                    🗣️ Cliente
                  </ToggleButton>
                  <ToggleButton value="agent" sx={{ py: 1.5 }}>
                    🧑‍💻 Io Stesso (Operatore)
                  </ToggleButton>
                  <ToggleButton value="internal" sx={{ py: 1.5 }}>
                    🏢 Staff Interno
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>

              {/* 2. TIPO DI TICKET (Grandi pulsanti intuitivi) */}
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1.5, fontWeight: 600, color: "text.secondary" }}
                >
                  Che tipo di problema è?
                </Typography>
                <ToggleButtonGroup
                  value={draftType}
                  exclusive
                  onChange={(_, value) => value && setDraftType(value)}
                  fullWidth
                  color="primary"
                >
                  <ToggleButton
                    value="bug"
                    sx={{
                      py: 1.5,
                      "&.Mui-selected": { bgcolor: "error.lighter" },
                    }}
                  >
                    ❌ Bug
                  </ToggleButton>
                  <ToggleButton
                    value="feature"
                    sx={{
                      py: 1.5,
                      "&.Mui-selected": { bgcolor: "success.lighter" },
                    }}
                  >
                    💡 Idea / Nuova Funzionalità
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>

              {/* 3. PRIORITÀ (Grandi pulsanti intuitivi) */}
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1.5, fontWeight: 600, color: "text.secondary" }}
                >
                  Quanto è urgente davvero? Sii onesto.
                </Typography>
                <ToggleButtonGroup
                  value={draftPriority}
                  exclusive
                  onChange={(_, value) => value && setDraftPriority(value)}
                  fullWidth
                >
                  <ToggleButton value="low" color="info" sx={{ py: 1.5 }}>
                    ☕ Non Urgente
                  </ToggleButton>
                  <ToggleButton value="medium" color="warning" sx={{ py: 1.5 }}>
                    ⚡ Normale
                  </ToggleButton>
                  <ToggleButton
                    value="high"
                    color="error"
                    sx={{ py: 1.5, fontWeight: "bold" }}
                  >
                    🔥 Emergenza Assoluta
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>

              <Divider sx={{ my: 1.5 }} />

              {/* 4. INPUT DI TESTO */}
              <TextField
                label="Breve Riepilogo / Titolo"
                placeholder="Sii sintetico, es. 'Il pulsante di pagamento non si clicca'"
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
                fullWidth
                required
                variant="outlined"
              />

              <TextField
                label="Dettagli Completi e Passaggi per Riprodurlo"
                placeholder="Su che pagina si trovavano? Cosa hanno cliccato? Scrivi quanti più dettagli possibili così gli sviluppatori non devono indovinare..."
                value={draftDescription}
                onChange={(e) => setDraftDescription(e.target.value)}
                multiline
                rows={5}
                fullWidth
                required
                variant="outlined"
              />

              {/* BOTTONE DI STAGING */}
              <Button
                variant="contained"
                size="large"
                startIcon={<AddCircleOutlineIcon />}
                disabled={!isDraftValid}
                onClick={handleAddTicket}
                color="secondary"
                sx={{
                  py: 2,
                  fontWeight: "bold",
                  textTransform: "none",
                  fontSize: "1.1rem",
                }}
              >
                {isDraftValid
                  ? "Aggiungi Questo Ticket al Gruppo 👇"
                  : "Per favore inserisci un Titolo e una Descrizione"}
              </Button>
            </Stack>
          </Card>
        </Grid>

        {/* COLONNA DESTRA: La coda di staging multi-ticket e invio finale */}
        <Grid size={6}>
          <Box sx={{ position: "sticky", top: 24 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Ticket Pronti da Inviare ({tickets.length})
              </Typography>

              {/* BOTTONE DI INVIO GENERALE */}
              {tickets.length > 0 && (
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  endIcon={<SendIcon />}
                  onClick={() => {}}
                  sx={{ fontWeight: "bold", px: 3, py: 1 }}
                >
                  Invia Tutto su Trello Ora
                </Button>
              )}
            </Box>

            {tickets.length === 0 ? (
              <Card
                variant="outlined"
                sx={{
                  p: 8,
                  textAlign: "center",
                  borderStyle: "dashed",
                  borderWidth: 2,
                  bgcolor: "grey.50",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" color="textSecondary" sx={{ mb: 1 }}>
                  Il tuo vassoio d'uscita è vuoto 📥
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  Compila il modulo a sinistra e clicca su "Aggiungi Questo
                  Ticket al Gruppo" per preparare un ticket per lo sviluppo.
                </Typography>
              </Card>
            ) : (
              <Stack
                spacing={2}
                sx={{ maxHeight: "70vh", overflowY: "auto", pr: 1 }}
              >
                {tickets.map((ticket, index) => {
                  const pBadge = getPriorityBadge(ticket.priority);
                  const tBadge = getTypeBadge(ticket.type);
                  return (
                    <Card
                      key={index}
                      variant="outlined"
                      sx={{
                        borderRadius: 2,
                        borderLeft: `6px solid ${
                          ticket.priority === "high"
                            ? "#d32f2f"
                            : ticket.priority === "medium"
                              ? "#ed6c02"
                              : "#0288d1"
                        }`,
                        boxShadow: 1,
                      }}
                    >
                      <CardContent sx={{ "&:last-child": { pb: 2 } }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            gap: 2,
                          }}
                        >
                          <Box sx={{ flexGrow: 1 }}>
                            <Stack
                              direction="row"
                              spacing={1}
                              sx={{ mb: 1.5, flexWrap: "wrap", gap: 1 }}
                            >
                              <Chip
                                label={`Da: ${ticket.source?.toUpperCase()}`}
                                size="small"
                                variant="outlined"
                                sx={{ fontWeight: "bold" }}
                              />
                              <Chip
                                label={tBadge?.label}
                                color={tBadge?.color}
                                size="small"
                                sx={{ fontWeight: "bold" }}
                              />
                              <Chip
                                label={pBadge?.label}
                                color={pBadge?.color}
                                size="small"
                                sx={{ fontWeight: "bold" }}
                              />
                            </Stack>

                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: 700,
                                mb: 0.5,
                                color: "grey.900",
                              }}
                            >
                              {ticket.title}
                            </Typography>

                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                whiteSpace: "pre-line",
                                bgcolor: "grey.50",
                                p: 1.5,
                                borderRadius: 1,
                                border: "1px solid #e0e0e0",
                              }}
                            >
                              {ticket.description}
                            </Typography>
                          </Box>

                          <IconButton
                            color="error"
                            onClick={() => handleRemoveTicket(index)}
                            aria-label="Elimina bozza ticket"
                            sx={{
                              bgcolor: "grey.100",
                              "&:hover": { bgcolor: "error.lighter" },
                            }}
                          >
                            <DeleteOutlineIcon />
                          </IconButton>
                        </Box>
                      </CardContent>
                    </Card>
                  );
                })}
              </Stack>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
