export type SchoolInfo = {
    aboutUs: string;
    latestNews: string;
    contactDetails: {
        email: string;
        phoneNumbers: string[];
    };
    schoolAddress: string;
    schoolName: string;
    noticeBoard: [
        {
            createdAt: Date;
            noticeContent: string;
        }
    ];
    contactUsThumbnail: string;
}