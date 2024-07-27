export const config:string = JSON.stringify(
    [
        {
            "name": "Order",
            "id": 1,
            "actions": {
                "new": {
                    "endpoint": "order/new",
                    "params": {}
                },
                "edit": {
                    "endpoint": "order/edit/${order_id}",
                    "params": {
                        "order_id": "Extract the id of the order"
                    }
                },
                "delete": {
                    "endpoint": "order/delete/${order_id}",
                    "params": {
                        "order_id": "Extract the id of the order"
                    }
                },
                "view": {
                    "endpoint": "order/views/${order_id}",
                    "params": {
                        "order_id": "Extract the id of the order"
                    }
                }
            },
            "validations": {
                "order_id": "function order_id(order_id) { return !isNaN(order_id) && typeof order_id === 'number' && isFinite(order_id); }"
            }
        },
        {
            "name": "News",
            "id": 2,
            "actions": {
                "new": {
                    "endpoint": "news/new",
                    "params": {}
                },
                "view": {
                    "endpoint": "news/view",
                    "params": {}
                },
                "filter": {
                    "endpoint": "news/view/${news_channel}/${news_category}",
                    "params": {
                        "news_channel": "Extract the news channel",
                        "news_category": "Extract the category of the news"
                    }
                }
            },
            "validations": {
                "news_channel": "function news_channel(news_channel) { return news_channel.length > 0; }",
                "news_category": "function news_category(news_category) { return news_category.length > 0; }"
            }
        },
        {
            "name": "Task",
            "id": 3,
            "actions": {
                "new": {
                    "endpoint": "task/new",
                    "params": {}
                },
                "edit": {
                    "endpoint": "task/edit/${task_id}",
                    "params": {
                        "task_id": "Extract the id of the task"
                    }
                },
                "delete": {
                    "endpoint": "task/delete/${task_id}",
                    "params": {
                        "task_id": "Extract the id of the task"
                    }
                },
                "view": {
                    "endpoint": "task/view/${task_id}",
                    "params": {
                        "task_id": "Extract the id of the task"
                    }
                }
            }
        }
    ]
);

export const commands:string = JSON.stringify([
    {
        "content": "Create a new order",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "I want to place a new order",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "Can you help me with adding a new order?",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "Initiate a new order",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "Start a new order process",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "Set up a new order",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "Begin creating a new order",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "Make a new order entry",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "Proceed with a new order",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "Go ahead and create a new order",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "Edit the existing order",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "I need to modify an order",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "Can you update order number one?",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "Change details of the current order",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "Adjust the order information",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "Revise the order details",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "Update the order",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "Alter the order",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "Make changes to the order",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "Edit order ID 1",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "Delete the order",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "Remove order number one",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "I want to cancel an order",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "Erase the existing order",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "Can you delete the order?",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "Get rid of the order",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "Terminate the order",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "Clear the order from records",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "Annul the order",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "Expunge the order",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "Show me the order details",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "I'd like to view the order",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "Can I see the order information?",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "Display the order",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "Provide the details of the order",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "Let me see the order",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "Reveal the order details",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "Exhibit the order information",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "Present the order",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "Unveil the order details",
        "metadata": {
        "id": 1
        }
    },
    {
        "content": "Create a new news item",
        "metadata": {
        "id": 2
        }
    },
    {
        "content": "I want to add a new news article",
        "metadata": {
        "id": 2
        }
    },
    {
        "content": "Can you help me post new news?",
        "metadata": {
        "id": 2
        }
    },
    {
        "content": "Initiate a new news entry",
        "metadata": {
        "id": 2
        }
    },
    {
        "content": "Start a new news process",
        "metadata": {
        "id": 2
        }
    },
    {
        "content": "Set up a new news article",
        "metadata": {
        "id": 2
        }
    },
    {
        "content": "Begin creating a new news item",
        "metadata": {
        "id": 2
        }
    },
    {
        "content": "Make a new news entry",
        "metadata": {
        "id": 2
        }
    },
    {
        "content": "Proceed with posting new news",
        "metadata": {
        "id": 2
        }
    },
    {
        "content": "Go ahead and create a new news article",
        "metadata": {
        "id": 2
        }
    },
    {
        "content": "Show me the news details",
        "metadata": {
        "id": 2
        }
    },
    {
        "content": "I'd like to view the news article",
        "metadata": {
        "id": 2
        }
    },
    {
        "content": "Can I see the news information?",
        "metadata": {
        "id": 2
        }
    },
    {
        "content": "Display the news article",
        "metadata": {
        "id": 2
        }
    },
    {
        "content": "Provide the details of the news",
        "metadata": {
        "id": 2
        }
    },
    {
        "content": "Let me see the news",
        "metadata": {
        "id": 2
        }
    },
    {
        "content": "Reveal the news details",
        "metadata": {
        "id": 2
        }
    },
    {
        "content": "Exhibit the news information",
        "metadata": {
        "id": 2
        }
    },
    {
        "content": "Present the news article",
        "metadata": {
        "id": 2
        }
    },
    {
        "content": "Unveil the news details",
        "metadata": {
        "id": 2
        }
    },
    {
        "content": "Filter the news articles",
        "metadata": {
        "id": 2
        }
    },
    {
        "content": "Apply filters to the news",
        "metadata": {
        "id": 2
        }
    },
    {
        "content": "Can you sort out the news based on my preferences?",
        "metadata": {
        "id": 2
        }
    },
    {
        "content": "Narrow down the news list",
        "metadata": {
        "id": 2
        }
    },
    {
        "content": "Refine the news search",
        "metadata": {
        "id": 2
        }
    },
    {
        "content": "Filter news by category",
        "metadata": {
        "id": 2
        }
    },
    {
        "content": "Sort the news items",
        "metadata": {
        "id": 2
        }
    },
    {
        "content": "Customize the news display",
        "metadata": {
        "id": 2
        }
    },
    {
        "content": "Adjust the news filters",
        "metadata": {
        "id": 2
        }
    },
    {
        "content": "Set news filters",
        "metadata": {
        "id": 2
        }
    },
    {
        "content": "Tailor the news results",
        "metadata": {
        "id": 2
        }
    },
    {
        "content": "Create a new task",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "I want to add a new task",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "Can you help me set up a new task?",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "Initiate a new task",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "Start a new task process",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "Set up a new task",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "Begin creating a new task",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "Make a new task entry",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "Proceed with a new task",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "Go ahead and create a new task",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "Edit the existing task",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "I need to modify a task",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "Can you update task number three?",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "Change details of the current task",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "Adjust the task information",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "Revise the task details",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "Update the task",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "Alter the task",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "Make changes to the task",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "Edit task ID 3",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "Delete the task",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "Remove task number three",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "I want to cancel a task",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "Erase the existing task",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "Can you delete the task?",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "Get rid of the task",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "Terminate the task",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "Clear the task from records",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "Annul the task",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "Expunge the task",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "Show me the task details",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "I'd like to view the task",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "Can I see the task information?",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "Display the task",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "Provide the details of the task",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "Let me see the task",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "Reveal the task details",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "Exhibit the task information",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "Present the task",
        "metadata": {
        "id": 3
        }
    },
    {
        "content": "Unveil the task details",
        "metadata": {
        "id": 3
        }
    }
]);

export const actions:string = JSON.stringify([
    {
        "content": "new",
        "metadata": {
        "name": "new"
        }
    },
    {
        "content": "edit",
        "metadata": {
        "name": "edit"
        }
    },
    {
        "content": "delete",
        "metadata": {
        "name": "delete"
        }
    },
    {
        "content": "view",
        "metadata": {
        "name": "view"
        }
    },
    {
        "content": "filter",
        "metadata": {
        "name": "filter"
        }
    },
    {
        "content": "create",
        "metadata": {
        "name": "new"
        }
    },
    {
        "content": "add",
        "metadata": {
        "name": "new"
        }
    },
    {
        "content": "generate",
        "metadata": {
        "name": "new"
        }
    },
    {
        "content": "initiate",
        "metadata": {
        "name": "new"
        }
    },
    {
        "content": "start",
        "metadata": {
        "name": "new"
        }
    },
    {
        "content": "begin",
        "metadata": {
        "name": "new"
        }
    },
    {
        "content": "establish",
        "metadata": {
        "name": "new"
        }
    },
    {
        "content": "open",
        "metadata": {
        "name": "new"
        }
    },
    {
        "content": "launch",
        "metadata": {
        "name": "new"
        }
    },
    {
        "content": "form",
        "metadata": {
        "name": "new"
        }
    },
    {
        "content": "modify",
        "metadata": {
        "name": "edit"
        }
    },
    {
        "content": "change",
        "metadata": {
        "name": "edit"
        }
    },
    {
        "content": "update",
        "metadata": {
        "name": "edit"
        }
    },
    {
        "content": "revise",
        "metadata": {
        "name": "edit"
        }
    },
    {
        "content": "alter",
        "metadata": {
        "name": "edit"
        }
    },
    {
        "content": "adjust",
        "metadata": {
        "name": "edit"
        }
    },
    {
        "content": "amend",
        "metadata": {
        "name": "edit"
        }
    },
    {
        "content": "refine",
        "metadata": {
        "name": "edit"
        }
    },
    {
        "content": "reshape",
        "metadata": {
        "name": "edit"
        }
    },
    {
        "content": "tweak",
        "metadata": {
        "name": "edit"
        }
    },
    {
        "content": "remove",
        "metadata": {
        "name": "delete"
        }
    },
    {
        "content": "erase",
        "metadata": {
        "name": "delete"
        }
    },
    {
        "content": "discard",
        "metadata": {
        "name": "delete"
        }
    },
    {
        "content": "eliminate",
        "metadata": {
        "name": "delete"
        }
    },
    {
        "content": "clear",
        "metadata": {
        "name": "delete"
        }
    },
    {
        "content": "expunge",
        "metadata": {
        "name": "delete"
        }
    },
    {
        "content": "wipe",
        "metadata": {
        "name": "delete"
        }
    },
    {
        "content": "exterminate",
        "metadata": {
        "name": "delete"
        }
    },
    {
        "content": "annihilate",
        "metadata": {
        "name": "delete"
        }
    },
    {
        "content": "obliterate",
        "metadata": {
        "name": "delete"
        }
    },
    {
        "content": "inspect",
        "metadata": {
        "name": "view"
        }
    },
    {
        "content": "examine",
        "metadata": {
        "name": "view"
        }
    },
    {
        "content": "observe",
        "metadata": {
        "name": "view"
        }
    },
    {
        "content": "see",
        "metadata": {
        "name": "view"
        }
    },
    {
        "content": "watch",
        "metadata": {
        "name": "view"
        }
    },
    {
        "content": "display",
        "metadata": {
        "name": "view"
        }
    },
    {
        "content": "show",
        "metadata": {
        "name": "view"
        }
    },
    {
        "content": "reveal",
        "metadata": {
        "name": "view"
        }
    },
    {
        "content": "browse",
        "metadata": {
        "name": "view"
        }
    },
    {
        "content": "look",
        "metadata": {
        "name": "view"
        }
    },
    {
        "content": "sort",
        "metadata": {
        "name": "filter"
        }
    },
    {
        "content": "organize",
        "metadata": {
        "name": "filter"
        }
    },
    {
        "content": "categorize",
        "metadata": {
        "name": "filter"
        }
    },
    {
        "content": "classify",
        "metadata": {
        "name": "filter"
        }
    },
    {
        "content": "arrange",
        "metadata": {
        "name": "filter"
        }
    },
    {
        "content": "segregate",
        "metadata": {
        "name": "filter"
        }
    },
    {
        "content": "screen",
        "metadata": {
        "name": "filter"
        }
    },
    {
        "content": "select",
        "metadata": {
        "name": "filter"
        }
    },
    {
        "content": "sift",
        "metadata": {
        "name": "filter"
        }
    },
    {
        "content": "refine",
        "metadata": {
        "name": "filter"
        }
    }
]);