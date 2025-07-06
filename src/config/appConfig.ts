interface AppConfig {
  websiteTitle: string;
  socialLinks: {
    xTwitter: string;
    github: string;
    gitbook: string;
  };
  contractAddress: string;
}

const appConfig: AppConfig = {
  websiteTitle: "BONK IT with AI",
  socialLinks: {
    xTwitter: "https://x.com/BonkItApp/",
    github: "https://github.com/x19ai/BONKITAPP",
    gitbook: "https://x19ai.gitbook.io/bonkit/",
  },
  contractAddress: "So11111111111111111111111111111111111111112",
};

export default appConfig; 