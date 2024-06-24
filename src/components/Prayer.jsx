/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function Prayer({ name ,time ,image}) {
  return (
    <div style={{ width: "18%" }}>
      <Card sx={{ maxWidth: 1000 }}>
        <CardMedia
          sx={{ height: 240 }}
          image={image}
          title="fajar"
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {name}
          </Typography>
          <Typography variant="h2" color="text.secondary">
            {time}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
