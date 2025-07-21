import express, { type Request, type Response } from 'express';
const app = express();
app.use(express.json());
const port = 3000;

const db = {
  video: [
    { prevue: 'firstVideo', id: 1, title: 'titleVIdeo_1' },
    { prevue: 'secondVideo', id: 2, title: 'titleVIdeo_2' },
    { prevue: 'thirdideo', id: 3, title: 'titleVIdeo_3' },
    { prevue: 'forthVideo', id: 4, title: 'titleVIdeo_4' },
    { prevue: 'fiveVideo', id: 5, title: 'titleVIdeo_5' },
    { prevue: 'sixVideo', id: 6, title: 'titleVIdeo_6' },
  ],
};

app.get('/', (req: Request, res: Response) => {
  res.json('This is Our VideoProject');
});

app.get('/videos', (req: Request, res: Response) => {
  res.json(db.video);
});

app.get('/videos/:id', (req: Request, res: Response) => {
  const videoId = req.params.id;

  const foundVideo = db.video.find((video) => video.id === +videoId);
  console.log(foundVideo, 'foundVideo');

  if (!foundVideo) {
    return res.sendStatus(404);
  }

  return res.status(200).json(foundVideo);
});

app.post('/videos', (req: Request, res: Response) => {
  const newTitle = req.body.title;
  const newPrevue = req.body.prevue;

  const newVideo = {
    id: Date.now(),
    prevue: newPrevue,
    title: newTitle,
  };

  db.video.push(newVideo);
  res.send(201).json(newVideo);
});

app.put('/videos/:id', (req: Request, res: Response) => {
  const videoId = req.params.id;
  const videoTitle = req.body.title;
  const videoPrevue = req.body.prevue;

  const foundVideo = db.video.find((video) => video.id === +videoId);

  if (!foundVideo) {
    return res.send(404);
  }

  foundVideo.title = videoTitle;
  foundVideo.prevue = videoPrevue;

  res.send(200).json(foundVideo);
});

app.delete('/videos/:id', (req: Request, res: Response) => {
  const reqId = req.params.id;

  const foundVideoIdx = db.video.findIndex((video) => video.id === +reqId);

  if (foundVideoIdx === -1) {
    res.sendStatus(404);
    return;
  }

  db.video.splice(foundVideoIdx, 1);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
