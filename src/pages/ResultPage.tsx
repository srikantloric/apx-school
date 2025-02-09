import { Button, TextField } from "@mui/material";

const ResultPage = () => {
  return (
    <>
      <div className="w-full flex justify-center items-center">
        <div className="px-5 py-10 flex flex-col items-center">
          <p className="text-xl font-semibold py-5 px-1">View Result</p>
          <div className="flex flex-row gap-4">
            <TextField
              id="filled-multiline-flexible"
              label="Student Id"
              variant="filled"
              size="small"
            />
            <Button variant="contained" size="small">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultPage;
