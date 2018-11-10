import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

const Loading = ({ classes, size }) => {
    return <div>
        <CircularProgress size={size} className={classes.progress}/>
    </div>;
};

export default withStyles(styles)(Loading);
