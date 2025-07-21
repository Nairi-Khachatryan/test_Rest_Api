import express, { type Request, type Response } from 'express';
const app = express();
app.use(express.json());
const port = 3000;

const db = {
  videos: [
    { prevue: 'firstVideo', id: 1, title: 'angry birds' },
    { prevue: 'secondVideo', id: 2, title: 'strong man' },
    { prevue: 'thirdideo', id: 3, title: 'hello world' },
    { prevue: 'forthVideo', id: 4, title: 'pinkman' },
    { prevue: 'fiveVideo', id: 5, title: 'agent' },
    { prevue: 'sixVideo', id: 6, title: 'mister bin' },
  ],
};

app.get('/', (req: Request, res: Response) => {
  res.json('This is Our VideoProject');
});

app.get('/videos', (req: Request, res: Response) => {
  if (req.query.title) {
    const querryTitle = req.query.title.toString();
    res.send(db.videos.filter((video) => video.title.includes(querryTitle)))
  }
  res.json(db.videos);
});

app.get('/videos/:id', (req: Request, res: Response) => {
  const videoId = req.params.id;

  const foundVideo = db.videos.find((video) => video.id === +videoId);
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

  db.videos.push(newVideo);
  res.send(201).json(newVideo);
});

app.put('/videos/:id', (req: Request, res: Response) => {
  const videoId = req.params.id;
  const videoTitle = req.body.title;
  const videoPrevue = req.body.prevue;

  const foundVideo = db.videos.find((video) => video.id === +videoId);

  if (!foundVideo) {
    return res.send(404);
  }

  foundVideo.title = videoTitle;
  foundVideo.prevue = videoPrevue;

  res.send(200).json(foundVideo);
});

app.delete('/videos/:id', (req: Request, res: Response) => {
  const reqId = req.params.id;

  const foundVideoIdx = db.videos.findIndex((video) => video.id === +reqId);

  if (foundVideoIdx === -1) {
    res.sendStatus(404);
    return;
  }

  db.videos.splice(foundVideoIdx, 1);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
