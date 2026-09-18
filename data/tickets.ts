import type { Ticket } from "../types/ticket.js";

const tickets: Ticket[] = [
    {
        id: 101,
        title: "Homepage form not submitting",
        description: "The homepage contact form does not submit when users click the submit button.",
        priority: "high",
        status: "open",
        assignedUserId: null,
        assignedTo: "Carlos"
    },
    {
        id: 102,
        title: "broken image",
        description: "An image on the website is not loading and displays a broken image icon.",
        priority: "low",
        status: "in progress",
        assignedUserId: null,
        assignedTo: "Tom"
    },
    {
        id: 103,
        title: "navigation bug",
        description: "The main navigation menu is not working correctly on smaller screen sizes.",
        priority: "medium",
        status: "in progress",
        assignedUserId: null,
        assignedTo: "Carlos"
    },
    {
        id: 104,
        title: "spam attacks",
        description: "The website is receiving a large number of spam form submissions.",
        priority: "urgent",
        status: "closed",
        assignedUserId: null,
        assignedTo: "Earl"
    },
    {
        id: 105,
        title: "checkout form",
        description: "Customers are experiencing an issue when attempting to complete the checkout form.",
        priority: "high",
        status: "open",
        assignedUserId: null,
        assignedTo: "John"
    }
];

export default tickets;