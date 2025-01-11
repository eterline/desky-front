interface AppCardInfo {
    name:           string;
    link:           string;
    icon:           string;
    description?:    string;
}

interface AppsTopicProps {
    topic:  string;
    apps:   AppCardInfo[];
}