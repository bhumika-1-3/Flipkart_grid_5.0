import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { useCallback } from 'react';
import { toast } from 'react-toastify';


const surveyJson = {
    title: "Learning Style",
    showProgressBar: "bottom",
    pages: [
        {
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "civilwar",
                    "title": "when operating new equipment for the first time I prefer to",
                    "choices": [
                        "read the instructions",
                        "listen to or ask for an explanation",
                        "have a go and learn by 'trial and error'"
                    ],
                    "correctAnswer": "1861-1865"
                }
            ]
        },
        {
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "civilwar",
                    "title": "when seeking travel directions I..",
                    "choices": [
                        "look at a map",
                        "ask for spoken directions",
                        "follow my nose or maybe use a compass"
                    ],
                    "correctAnswer": "1861-1865"
                }
            ]
        },
        {
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "civilwar",
                    "title": "when cooking a new dish I..",
                    "choices": [
                        "follow a recipe",
                        "call a friend for an explanation",
                        "follow my instinct, tasting as I cook"
                    ],
                    "correctAnswer": "1861-1865"
                }
            ]
        },
        {
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "civilwar",
                    "title": "to teach someone something I..",
                    "choices": [
                        "write instructions",
                        "explain verbally",
                        "demonstrate and let them have a go"
                    ],
                    "correctAnswer": "1861-1865"
                }
            ]
        },
        {
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "civilwar",
                    "title": "I tend to say..",
                    "choices": [
                        "I see what you mean",
                        "I hear what you are saying",
                        "I know how you feel"
                    ],
                    "correctAnswer": "1861-1865"
                }
            ]
        },
        {
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "civilwar",
                    "title": "I tend to say..",
                    "choices": [
                        "show me",
                        "tell me",
                        "let me try"
                    ],
                    "correctAnswer": "1861-1865"
                }
            ]
        },
        {
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "civilwar",
                    "title": "I tend to say..",
                    "choices": [
                        "watch how I do it",
                        "listen to me explain",
                        "you have a go"
                    ],
                    "correctAnswer": "1861-1865"
                }
            ]
        },
        {
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "civilwar",
                    "title": "complaining about faulty goods I tend to..",
                    "choices": [
                        "write a letter",
                        "phone",
                        "go back to the store, or send the faulty item to the head"
                    ],
                    "correctAnswer": "1861-1865"
                }
            ]
        },
        {
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "civilwar",
                    "title": "I prefer these leisure activities",
                    "choices": [
                        "museums or galleries",
                        "music or conversation",
                        "physical activities or making things"
                    ],
                    "correctAnswer": "1861-1865"
                }
            ]
        },
        {
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "civilwar",
                    "title": "when shopping generally I tend to..",
                    "choices": [
                        "look and decide",
                        "discuss with shop staff",
                        "try on, handle or test"
                    ],
                    "correctAnswer": "1861-1865"
                }
            ]
        },
        {
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "civilwar",
                    "title": "choosing a holiday I..",
                    "choices": [
                        "read the brochures",
                        "listen to recommendations",
                        "imagine the experience"
                    ],
                    "correctAnswer": "1861-1865"
                }
            ]
        },
        {
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "civilwar",
                    "title": "choosing a new car I..",
                    "choices": [
                        "read the reviews",
                        "discuss with friends",
                        "test-drive what you fancy"
                    ],
                    "correctAnswer": "1861-1865"
                }
            ]
        },
        {
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "civilwar",
                    "title": "learning a new skill",
                    "choices": [
                        "I watch what the teacher is doing",
                        "I talk through with the teacher exactly what I am supposed to do",
                        "I like to give it a try and work it out as I go along by doing it"
                    ],
                    "correctAnswer": "1861-1865"
                }
            ]
        },
        {
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "civilwar",
                    "title": "choosing from a restaurant menu..",
                    "choices": [
                        "I imagine what the food will look like",
                        "I talk through the options in my head",
                        "I imagine what the food will taste like"
                    ],
                    "correctAnswer": "1861-1865"
                }
            ]
        },
        {
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "civilwar",
                    "title": "when listening to a band",
                    "choices": [
                        "I sing along to the lyrics (in my head or out loud!)",
                        "I listen to the lyrics and the beats",
                        "I move in time with the music"
                    ],
                    "correctAnswer": "1861-1865"
                }
            ]
        },
        {
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "civilwar",
                    "title": "when concentrating I..",
                    "choices": [
                        "focus on the words or pictures in front of me",
                        "discuss the problem and possible solutions in my head",
                        "move around a lot, fiddle with pens and pencils and touch unrelated things"
                    ],
                    "correctAnswer": "1861-1865"
                }
            ]
        },
        {
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "civilwar",
                    "title": "I remember things best by..",
                    "choices": [
                        "writing notes or keeping printed details",
                        "saying them aloud or repeating words and key points in my head",
                        "doing and practising the activity, or imagining it being done"
                    ],
                    "correctAnswer": "1861-1865"
                }
            ]
        },
        {
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "civilwar",
                    "title": "my first memory is of",
                    "choices": [
                        "looking at something",
                        "being spoken to",
                        "doing something"
                    ],
                    "correctAnswer": "1861-1865"
                }
            ]
        },
        {
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "civilwar",
                    "title": "when anxious, I..",
                    "choices": [
                        "visualise the worst-case scenarios",
                        "talk over in my head what worries me most",
                        "can't sit still, fiddle and move around constantly"
                    ],
                    "correctAnswer": "1861-1865"
                }
            ]
        },
        {
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "civilwar",
                    "title": "I feel especially connected to others because of",
                    "choices": [
                        "how they look",
                        "what they say to me",
                        "how they make me feel"
                    ],
                    "correctAnswer": "1861-1865"
                }
            ]
        },
        {
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "civilwar",
                    "title": "when I revise for an exam, I..",
                    "choices": [
                        "write lots of revision notes (using lots of colours!)",
                        "I talk over my notes, to myself or to other people",
                        "imagine making the movement or creating the formula"
                    ],
                    "correctAnswer": "1861-1865"
                }
            ]
        },
        {
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "civilwar",
                    "title": "when explaining something to someone, I tend to..",
                    "choices": [
                        "show them what I mean",
                        "explain to them in different ways until they understand",
                        "encourage them to try and talk them through the idea as they try"
                    ],
                    "correctAnswer": "1861-1865"
                }
            ]
        },
        {
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "civilwar",
                    "title": "my main interests are",
                    "choices": [
                        "photography or watching films or people-watching",
                        "listening to music or listening to the radio or talking to friends",
                        "physical /sports activities or fine wines, fine foods or dancing"
                    ],
                    "correctAnswer": "1861-1865"
                }
            ]
        },
        {
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "civilwar",
                    "title": "most of my free time is spent..",
                    "choices": [
                        "watching television",
                        "talking to friends",
                        "doing physical activity or making things"
                    ],
                    "correctAnswer": "1861-1865"
                }
            ]
        },
        {
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "civilwar",
                    "title": "when I first contact a new person..",
                    "choices": [
                        "I arrange a face to face meeting",
                        "I talk to them on the telephone",
                        "I try to get together to share an activity"
                    ],
                    "correctAnswer": "1861-1865"
                }
            ]
        },
        {
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "civilwar",
                    "title": "I first notice how people..",
                    "choices": [
                        "look and dress",
                        "sound and speak",
                        "stand and move"
                    ],
                    "correctAnswer": "1861-1865"
                }
            ]
        },
        {
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "civilwar",
                    "title": "if I am very angry..",
                    "choices": [
                        "I keep replaying in my mind what it is that has upset me",
                        "I shout lots and tell people how I feel",
                        "I stomp about, slam doors and throw things"
                    ],
                    "correctAnswer": "1861-1865"
                }
            ]
        },
        {
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "civilwar",
                    "title": "I find it easiest to remember",
                    "choices": [
                        "faces",
                        "names",
                        "things I have done"
                    ],
                    "correctAnswer": "1861-1865"
                }
            ]
        },
        {
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "civilwar",
                    "title": "I think I can tell someone is lying because..",
                    "choices": [
                        "they avoid looking at you",
                        "their voice changes",
                        "the vibes I get from them"
                    ],
                    "correctAnswer": "1861-1865"
                }
            ]
        },
        {
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "civilwar",
                    "title": "When I'm meeting with an old friend..",
                    "choices": [
                        "I say 'it's great to see you!'",
                        "I say 'it's great to hear your voice!'",
                        "I give them a hug or a handshake"
                    ],
                    "correctAnswer": "1861-1865"
                }
            ]
        }
    ]
};

const PysQuestions = () => {
    const survey = new Model(surveyJson);
    const alertResults = useCallback((sender) => {
        const results = JSON.stringify(sender.data);
        toast("Test Completed")
    }, []);

    survey.onComplete.add(alertResults);

    return <Survey model={survey} />;
}

export default PysQuestions
