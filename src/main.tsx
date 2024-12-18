// Learn more at developers.reddit.com/docs
import { Devvit } from '@devvit/public-api';
import Game from './logic/Game.js';
import LoadingView from './view/LoadingView.js';
import { Menu } from './view/Menu.js';

Devvit.configure({
  redditAPI: true,
  redis: true,
});

// Add a menu item to the subreddit menu for instantiating the new experience post
Devvit.addMenuItem({
  label: 'Add my post',
  location: 'subreddit',
  forUserType: 'moderator',
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
    ui.showToast("Submitting your post - upon completion you'll navigate there.");

    const subreddit = await reddit.getCurrentSubreddit();
    const post = await reddit.submitPost({
      title: 'Grid 7 - Mini Game',
      subredditName: subreddit.name,
      preview: <LoadingView />,
    });
    ui.navigateTo(post);
  },
});

// temp solution
const gameInstance = new Game();

Devvit.addCustomPostType({
  name: 'Experience Post',
  description: 'description',
  height: 'tall',
  render: (_context) => {
    return <Menu props={{ game: gameInstance, context: _context }} />;
  },
});

export default Devvit;
