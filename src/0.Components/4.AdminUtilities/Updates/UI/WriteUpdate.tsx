import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Stack,
  Chip,
  IconButton,
  Grid,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// Interface for individual items as requested
export interface UpdateItem {
  title: string;
  description: string;
  type: "bugfix" | "feature" | "change";
}

// Accept the return type of your useCreateUpdateForm hook
interface UpdateManagerProps {
  form: {
    getFieldValue: (key: "items") => UpdateItem[];
    setFieldValue: (key: "items", value: UpdateItem[]) => void;
    // Add any other parent form properties if you need them here
  };
}

export default function UpdateManager({ form }: UpdateManagerProps) {
  // Read the items directly from the parent form state
  const items = form.getFieldValue("items") || [];

  // Local draft states for the inputs before they are added to the parent form array
  const [draftTitle, setDraftTitle] = useState("");
  const [draftDescription, setDraftDescription] = useState("");
  const [draftType, setDraftType] = useState<UpdateItem["type"]>("feature");

  // Input validation for the add button
  const isDraftValid =
    draftTitle.trim().length > 0 && draftDescription.trim().length > 0;

  // Add item to parent form array
  const handleAddItem = () => {
    if (!isDraftValid) return;

    const newItem: UpdateItem = {
      title: draftTitle.trim(),
      description: draftDescription.trim(),
      type: draftType,
    };

    // Update parent form state directly
    form.setFieldValue("items", [...items, newItem]);

    // Clear local inputs for the next entry
    setDraftTitle("");
    setDraftDescription("");
    setDraftType("feature");
  };

  // Remove item from parent form array
  const handleRemoveItem = (indexToRemove: number) => {
    const updatedItems = items.filter((_, index) => index !== indexToRemove);
    form.setFieldValue("items", updatedItems);
  };

  // Human-friendly visual mapping for the non-tech user
  const getTypeBadgeProps = (type: UpdateItem["type"]) => {
    switch (type) {
      case "bugfix":
        return { label: "Bug Fix", color: "error" as const };
      case "feature":
        return { label: "New Feature", color: "success" as const };
      case "change":
        return { label: "General Change", color: "info" as const };
    }
  };

  return (
    <Box sx={{ p: 2, width: "100%" }}>
      <Grid container spacing={4}>
        {/* LEFT COLUMN: Input Draft Fields */}
        <Grid size={12}>
          <Card
            variant="outlined"
            sx={{ p: 3, borderRadius: 2, bgcolor: "background.paper" }}
          >
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Add An Item to This Update
            </Typography>

            <Stack spacing={3}>
              <TextField
                label="Update Title"
                placeholder="e.g., Fixed payment screen freeze"
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
                fullWidth
                variant="outlined"
              />

              <TextField
                label="Update Type"
                select
                value={draftType}
                onChange={(e) =>
                  setDraftType(e.target.value as UpdateItem["type"])
                }
                fullWidth
              >
                <MenuItem value="feature">✨ New Feature</MenuItem>
                <MenuItem value="bugfix">🐛 Bug Fix</MenuItem>
                <MenuItem value="change">🔧 General Change</MenuItem>
              </TextField>

              <TextField
                label="Description / Details"
                placeholder="Explain what changed in simple words..."
                value={draftDescription}
                onChange={(e) => setDraftDescription(e.target.value)}
                multiline
                rows={4}
                fullWidth
                variant="outlined"
              />

              <Button
                variant="contained"
                size="large"
                startIcon={<AddCircleOutlineIcon />}
                disabled={!isDraftValid}
                onClick={handleAddItem}
                sx={{ py: 1.5, fontWeight: "bold", textTransform: "none" }}
              >
                Add to Update List
              </Button>
            </Stack>
          </Card>
        </Grid>

        {/* RIGHT COLUMN: Real-time Live Preview of Parent Form Array */}
        <Grid size={12}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Current Items Added ({items.length})
          </Typography>

          {items.length === 0 ? (
            <Card
              variant="outlined"
              sx={{
                p: 6,
                textAlign: "center",
                borderStyle: "dashed",
                bgcolor: "grey.50",
                borderRadius: 2,
              }}
            >
              <Typography color="textSecondary" variant="body1">
                Your update list is empty.
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
                sx={{ mt: 0.5 }}
              >
                Fill out the form on the left to add your first item.
              </Typography>
            </Card>
          ) : (
            <Stack spacing={2}>
              {items.map((item, index) => {
                const badge = getTypeBadgeProps(item.type);
                return (
                  <Card
                    key={index}
                    variant="outlined"
                    sx={{
                      borderRadius: 2,
                      transition: "0.2s",
                      "&:hover": { boxShadow: 1 },
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
                            alignItems="center"
                            sx={{ mb: 1, flexWrap: "wrap", gap: 1 }}
                          >
                            <Typography
                              variant="h6"
                              component="h3"
                              sx={{ fontWeight: 600, fontSize: "1.05rem" }}
                            >
                              {item.title}
                            </Typography>
                            <Chip
                              label={badge.label}
                              color={badge.color}
                              size="small"
                              sx={{
                                fontWeight: "bold",
                                fontSize: "0.72rem",
                                height: 20,
                              }}
                            />
                          </Stack>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ whiteSpace: "pre-line" }}
                          >
                            {item.description}
                          </Typography>
                        </Box>

                        <IconButton
                          color="error"
                          onClick={() => handleRemoveItem(index)}
                          aria-label="Delete item"
                          size="small"
                          sx={{ mt: -0.5 }}
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                );
              })}
            </Stack>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
