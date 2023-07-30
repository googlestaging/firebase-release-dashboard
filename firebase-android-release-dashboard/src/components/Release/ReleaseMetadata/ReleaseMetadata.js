import React from "react";
import PropTypes from "prop-types";
import {Grid, Chip, Typography} from "@material-ui/core";
import {format} from "date-fns";
import {RELEASE_STATES} from "../../../utils/releaseStates";
import theme from "../../../config/theme";
import useStyles from "./styles";

const chipColor = (state) => {
  switch (state) {
    case RELEASE_STATES.CODE_FREEZE:
      return theme.palette.chip.blue;
    case RELEASE_STATES.RELEASE_DAY:
      return theme.palette.chip.purple;
    case RELEASE_STATES.RELEASED:
      return theme.palette.chip.green;
    case RELEASE_STATES.DELAYED:
      return theme.palette.chip.orange;
    case RELEASE_STATES.ERROR:
      return theme.palette.chip.error;
    default:
      return theme.palette.chip.gray;
  }
};

/**
 * Represents the metadata of a single release.
 *
 * @component
 * @param {Object} release - The release to render.
 * @return {JSX.Element} The ReleaseMetadata component.
 */
function ReleaseMetadata({release}) {
  const classes = useStyles();

  const {
    releaseName,
    releaseDate,
    codeFreezeDate,
    state,
  } = release;

  return (
    <Grid container className={classes.metadata}>
      <Grid item xs={3}>
        <Typography
          variant="h5"
          color="textPrimary"
          className={classes.metadataItem}
        >
          {releaseName}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography
          variant="subtitle1"
          color="textPrimary"
          className={classes.metadataItem}
        >
          {format(codeFreezeDate, "MMM. dd, yyyy")}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography
          variant="subtitle1"
          color="textPrimary"
          className={classes.metadataItem}
        >
          {format(releaseDate, "MMM. dd, yyyy")}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Chip
          label={state}
          className={classes.stateChip}
          style={{backgroundColor: chipColor(state)}}
        />
      </Grid>
    </Grid>
  );
}

ReleaseMetadata.propTypes = {
  release: PropTypes.shape({
    releaseName: PropTypes.string.isRequired,
    releaseDate: PropTypes.any.isRequired,
    codeFreezeDate: PropTypes.any.isRequired,
    state: PropTypes.oneOf(
        ["code freeze", "release day", "released", "delayed", "error"],
    ).isRequired,
  }).isRequired,
};

export default ReleaseMetadata;
