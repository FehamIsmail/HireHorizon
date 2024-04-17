import { IJob, JobType } from "./types";
import { loremIpsum } from "lorem-ipsum";

const generateLorem = () => loremIpsum({
    count: 10,                // Number of "words", "sentences", or "paragraphs"
    format: "plain",         // "plain" or "html"
    paragraphLowerBound: 4,  // Min. number of sentences per paragraph.
    paragraphUpperBound: 7,  // Max. number of sentences per paragarph.
    sentenceLowerBound: 6,   // Min. number of words per sentence.
    sentenceUpperBound: 15,  // Max. number of words per sentence.
    suffix: "\r\n\n",            // Line ending, defaults to "\n" or "\r\n" (win32)
    units: "paragraphs",      // paragraph(s), "sentence(s)", or "word(s)"
})

export const mockJobs: IJob[] = [
    {
        id: 1,
        title: "Software Engineer",
        types: [JobType.FULL_TIME],
        short_description: "We are looking for a software engineer to join our team.",
        description: generateLorem(),
        street_address: "San Francisco, CA",
        company: "Apple Inc.",
        salary: 100000,
        posted_date: new Date("2022-02-01"),
        deadline: new Date("2022-03-01"),
        contact_email: "jobs@example.com",
        contact_phone: null,
        website_url: "https://example.com/jobs",
        company_logo: "https://greenjobs.nl/_nuxt/img/default-organisation.b55e6ea.png",
        match: 90,
    },
    {
        id: 2,
        title: "Marketing Manager",
        types: [JobType.FULL_TIME, JobType.PERMANENT],
        short_description: "We are looking for a marketing manager to lead our team.",
        description: generateLorem(),
        street_address: "New York, NY",
        company: "Amazon.com Inc.",
        salary: 80000,
        posted_date: new Date("2022-02-01"),
        deadline: new Date("2022-03-01"),
        contact_email: "jobs@example.com",
        contact_phone: null,
        website_url: "https://example.com/jobs",
        company_logo: "https://greenjobs.nl/_nuxt/img/default-organisation.b55e6ea.png",
        match: 80,
    },
    {
        id: 3,
        title: "Graphic Designer",
        types: [JobType.PART_TIME],
        short_description: "We are looking for a graphic designer to work on a part-time basis.",
        description: generateLorem(),
        company: "Alphabet Inc.",
        street_address: "Los Angeles, CA",
        salary: 50000,
        posted_date: new Date("2022-02-01"),
        deadline: new Date("2022-03-01"),
        contact_email: "jobs@example.com",
        contact_phone: null,
        website_url: "https://example.com/jobs",
        company_logo: "https://greenjobs.nl/_nuxt/img/default-organisation.b55e6ea.png",
        match: 70,
    },
    {
        id: 4,
        title: "Product Manager",
        types: [JobType.FULL_TIME],
        short_description: "We are looking for a product manager to join our team.",
        description: generateLorem(),
        company: "Facebook Inc.",
        street_address: "Seattle, WA",
        salary: 120000,
        posted_date: new Date("2022-02-01"),
        deadline: new Date("2022-03-01"),
        contact_email: "jobs@example.com",
        contact_phone: null,
        website_url: "https://example.com/jobs",
        company_logo: "https://greenjobs.nl/_nuxt/img/default-organisation.b55e6ea.png",
        match: 60,
    },
    {
        id: 5,
        title: "Sales Representative",
        types: [JobType.CONTRACT],
        short_description: "We are looking for a sales representative to work on a contract basis.",
        description: generateLorem(),
        company: "IBM Corporation",
        street_address: "Chicago, IL",
        salary: 50000,
        posted_date: new Date("2022-02-01"),
        deadline: new Date("2022-03-01"),
        contact_email: "jobs@example.com",
        contact_phone: null,
        website_url: "https://example.com/jobs",
        company_logo: "https://greenjobs.nl/_nuxt/img/default-organisation.b55e6ea.png",
        match: 50,
    },
    {
        id: 6,
        title: "Data Analyst",
        types: [JobType.FULL_TIME, JobType.REMOTE],
        short_description: "We are looking for a data analyst to join our team.",
        description: generateLorem(),
        company: "Intel Corporation",
        street_address: "San Francisco, CA",
        salary: 90000,
        posted_date: new Date("2022-02-01"),
        deadline: new Date("2022-03-01"),
        contact_email: "jobs@example.com",
        contact_phone: null,
        website_url: "https://example.com/jobs",
        company_logo: "https://greenjobs.nl/_nuxt/img/default-organisation.b55e6ea.png",
        match: 40,
    },
    {
        id: 7,
        title: "HR Coordinator",
        types: [JobType.TEMPORARY],
        short_description: "We are looking for an HR coordinator to work on a temporary basis.",
        description: generateLorem(),
        company: "Microsoft Corporation",
        street_address: "Boston, MA",
        salary: 60000,
        posted_date: new Date("2022-02-01"),
        deadline: new Date("2022-03-01"),
        contact_email: "jobs@example.com",
        contact_phone: null,
        website_url: "https://example.com/jobs",
        company_logo: "https://greenjobs.nl/_nuxt/img/default-organisation.b55e6ea.png",
        match: 30,
    },
    {
        id: 8,
        title: "Content Writer",
        types: [JobType.FREELANCE],
        short_description: "We are looking for a content writer to work on a freelance basis.",
        description: generateLorem(),
        company: "Oracle Corporation",
        street_address: "Austin, TX",
        salary: null,
        posted_date: new Date("2022-02-01"),
        deadline: new Date("2022-03-01"),
        contact_email: "jobs@example.com",
        contact_phone: null,
        website_url: "https://example.com/jobs",
        company_logo: "https://greenjobs.nl/_nuxt/img/default-organisation.b55e6ea.png",
        match: 20,
    },
    {
        id: 9,
        title: "IT Support Specialist",
        types: [JobType.FULL_TIME],
        short_description: "We are looking for an IT support specialist to join our team.",
        description: generateLorem(),
        company: "Samsung Electronics Co., Ltd.",
        street_address: "Portland, OR",
        salary: 70000,
        posted_date: new Date("2022-02-01"),
        deadline: new Date("2022-03-01"),
        contact_email: "jobs@example.com",
        contact_phone: null,
        website_url: "https://example.com/jobs",
        company_logo: "https://greenjobs.nl/_nuxt/img/default-organisation.b55e6ea.png",
        match: 10,
    },
    {
        id: 10,
        title: "Customer Service Representative",
        types: [JobType.PART_TIME, JobType.REMOTE],
        short_description: "We are looking for a customer service representative to work part-time and remotely.",
        description: generateLorem(),
        company: "Tesla, Inc.",
        street_address: "Miami, FL",
        salary: 35000,
        posted_date: new Date("2022-02-01"),
        deadline: new Date("2022-03-01"),
        contact_email: "jobs@example.com",
        contact_phone: null,
        website_url: "https://example.com/jobs",
        company_logo: "https://greenjobs.nl/_nuxt/img/default-organisation.b55e6ea.png",
        match: 0,
    },
]

