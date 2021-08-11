import { CircularProgress, Paper } from "@material-ui/core"

const Loading = () => {
    return (
        <Paper className="px-5 py-2 w-full">
            <div className="flex items-center">
                <CircularProgress color="secondary"/>
                <p className="ml-5 font-black">Loading...</p>
            </div>
        </Paper>
    )
}

export default Loading
