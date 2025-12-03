import { TestimonialDT } from "@/types/testimonial-d-t";
import avaterOne from "../../public/assets/img/avater/avater-1.png";
import avaterTwo from "../../public/assets/img/avater/avater-2.png";
import avaterThree from "../../public/assets/img/avater/avater-3.jpg";
import avaterFour from "../../public/assets/img/avater/avater-4.jpg";
import avaterFive from "../../public/assets/img/avater/avater-5.jpg";
import avaterSix from "../../public/assets/img/avater/avater-6.jpg";
//home four avater image
import avater7 from "../../public/assets/img/home-04/avater/avater-1.jpg";
import avater8 from "../../public/assets/img/home-04/avater/avater-3.jpg";
import avater9 from "../../public/assets/img/home-04/avater/avater-4.jpg";
import avater10 from "../../public/assets/img/home-04/avater/avater-5.jpg";
//home 10 images
import testimonial1 from '../../public/assets/img/home-10/testimonial/testimonial-item-1.png';
import testimonial2 from '../../public/assets/img/home-10/testimonial/testimonial-item-2.png';
import testimonial3 from '../../public/assets/img/home-10/testimonial/testimonial-item-3.png';
import testimonial4 from '../../public/assets/img/home-10/testimonial/testimonial-item-4.png';
//Home IT Solution testimonial images
import testiImg from '../../public/assets/img/home-11/testimonial/testi-img-1.jpg';
import testiBrand from '../../public/assets/img/home-11/testimonial/testi-brand-1.jpg';
//Home cripto currency testimonial envato logo
import envatoLogo from '../../public/assets/img/home-13/testimonial/envato.png';
//shop modern testimonial user image
import userImg1 from "../../public/assets/img/product/product-details-main/desc/user-3.jpg"
import userImg2 from "../../public/assets/img/product/product-details-main/desc/user-4.jpg"
import userImg3 from "../../public/assets/img/product/product-details-main/desc/user-5.jpg"
import userImg4 from "../../public/assets/img/product/product-details-main/desc/user-6.jpg"
import userImg5 from "../../public/assets/img/product/product-details-main/desc/user-7.jpg"
import userImg6 from "../../public/assets/img/product/product-details-main/desc/user-1.jpg"
import userImg7 from "../../public/assets/img/product/product-details-main/desc/user-2.jpg"

const testimonialsData: TestimonialDT[] = [
    {
        id: 1,
        quote: "“Agntix studio ability to create a high quality UI is stands out. It’s something we placed a premium on. A studio with passionate, professional, fun and full creativity.”",
        name: "Albert Juan",
        position: "CEO & Founder, Archin Studio",
        avatar: avaterOne,
        style: "white-style"
    },
    {
        id: 2,
        quote: "“Agntix studio ability to create a high quality UI is stands out. It’s something we placed a premium on. A studio with passionate, professional, fun and full creativity.”",
        name: "Koen Chegg",
        position: "CEO & Founder, Archin Studio",
        avatar: avaterTwo,
        style: "green-style"
    },
    {
        id: 3,
        quote: "“Agntix studio ability to create a high quality UI is stands out. It’s something we placed a premium on. A studio with passionate, professional, fun and full creativity.”",
        name: "Warren Daniel",
        position: "CEO & Founder, Archin Studio",
        avatar: avaterThree,
        style: "black-style"
    },
    {
        id: 4,
        quote: "“Agntix studio ability to create a high quality UI is stands out. It’s something we placed a premium on. A studio with passionate, professional, fun and full creativity.”",
        name: "Elvin Bond",
        position: "CEO & Founder, Archin Studio",
        avatar: avaterFour,
        style: "white-style"
    },
    {
        id: 5,
        quote: "“Agntix studio ability to create a high quality UI is stands out. It’s something we placed a premium on. A studio with passionate, professional, fun and full creativity.”",
        name: "Abbas",
        position: "CEO & Founder, Archin Studio",
        avatar: avaterFive,
        style: "grey-style"
    },
    {
        id: 6,
        quote: "“Agntix studio ability to create a high quality UI is stands out. It’s something we placed a premium on. A studio with passionate, professional, fun and full creativity.”",
        name: "Jessamine Mumtaz",
        position: "CEO & Founder, Archin Studio",
        avatar: avaterSix,
        style: "green-style"
    },
    {
        id: 7,
        quote: "“Agntix studio ability to create a high quality UI is stands out. It’s something we placed a premium on. A studio with passionate, professional, fun and full creativity.”",
        name: "Koen Chegg",
        position: "CEO & Founder, Archin Studio",
        avatar: avaterTwo,
        style: "black-style"
    },
    //home four testimonial data start
    {
        id: 8,
        avatar: avater7,
        name: "Bradley Gordon",
        position: "Co-Founder of Agntix",
        rating: 5,
        quote: "Agntix went above and beyond to make sure we got something we were happy with."
    },
    {
        id: 9,
        avatar: avater8,
        name: "Tisha Norton",
        position: "Co-Founder of Agntix",
        rating: 5,
        quote: "The team at Agntix was incredibly attentive and made sure every detail was perfect."
    },
    {
        id: 10,
        avatar: avater9,
        name: "Emma Berger",
        position: "Co-Founder of Agntix",
        rating: 5,
        quote: "We're beyond satisfied — Agntix made the entire process seamless and rewarding."
    },
    {
        id: 11,
        avatar: avater10,
        name: "Mary Cruz",
        position: "Co-Founder of Agntix",
        rating: 5,
        quote: "From start to finish, Agntix went the extra mile to ensure we were thrilled with the result."
    },
    //home four testimonial data end

    // home five design-agency-light start
    {
        id: 12,
        name: "Andrew Gross",
        position: "CEO & Co-Founder",
        rating: 5.0,
        quote: `"I was really impressed with their speed and how quickly things moved."`
    },
    {
        id: 13,
        name: "Matthew Blake",
        position: "Chief Executive Officer",
        rating: 5.0,
        quote: "Their speed and swift them execution truly is impressed me this project."
    },
    {
        id: 14,
        name: "Jonathan Cross",
        position: "Founder & Chief Executive",
        rating: 5.0,
        quote: "I couldn't believe how i quickly fix everything came in together."
    },
    {
        id: 15,
        name: "Benjamin Hayes",
        position: "CEO & Head of Innovation",
        rating: 5.0,
        quote: `"I was blown away by how fast and smoothly things moved the item."`
    },
    {
        id: 16,
        name: "William Tate",
        position: "Managing Partner & CEO",
        rating: 5.0,
        quote: `"I was amazed by their efficiency and how fast everything progressed."`
    },
    // home five design-agency-light end

    // home Six creative-agency-light data start
    {
        id: 17,
        name: "Andrew Gross",
        position: "CEO & Co-Founder",
        rating: 5.0,
        quote: "I was really impressed with their speed and how quickly things moved."
    },
    {
        id: 18,
        name: "Matthew Blake",
        position: "Chief Executive Officer",
        rating: 5.0,
        quote: "Their speed and swift execution truly impressed me on this project."
    },
    {
        id: 19,
        name: "Jonathan Cross",
        position: "Founder & Chief Executive",
        rating: 5.0,
        quote: "I couldn't believe how quickly everything came together."
    },
    {
        id: 20,
        name: "Benjamin Hayes",
        position: "CEO & Head of Innovation",
        rating: 5.0,
        quote: "I was blown away by how fast and smoothly things moved."
    },
    {
        id: 21,
        name: "William Tate",
        position: "Managing Partner & CEO",
        rating: 5.0,
        quote: "I was amazed by their efficiency and how fast everything progressed."
    },
    // home Six creative-agency-light data end

    // home nine corporate-agency-light data start
    {
        id: 22,
        quote: "When we talk about Alts, we do not mean a typical business partner, but rather a team that collaborates with us daily, always there for us when we encounter difficulties and celebrate achievements.",
        name: "Mike David",
        role: "Developer"
    },
    {
        id: 23,
        quote: "The service and support was exceptional. They went above and beyond to ensure our project was successful and delivered on time.",
        name: "Sarah Johnson",
        role: "Product Manager"
    },
    {
        id: 24,
        quote: "Working with this team has been a game-changer for our business. Their expertise and dedication are unmatched in the industry.",
        name: "James Wilson",
        role: "CEO"
    },
    // home nine corporate-agency-light data end
    {
        id: 25,
        avatar: testimonial1,
        name: "Kate Leeman",
        position: "Head of Product, Designer",
        quote: "I love how agntix helps me track my expenses and alerts me about upcoming bills. It's a must have app!",
        rating: 5
    },
    {
        id: 26,
        avatar: testimonial2,
        name: "Kate Leeman",
        position: "Head of Product, Designer",
        quote: "I love how agntix helps me track my expenses and alerts me about upcoming bills. It's a must have app!",
        rating: 5
    },
    {
        id: 27,
        avatar: testimonial3,
        name: "Kate Leeman",
        position: "Head of Product, Designer",
        quote: "I love how agntix helps me track my expenses and alerts me about upcoming bills. It's a must have app!",
        rating: 5
    },
    {
        id: 28,
        avatar: testimonial4,
        name: "Kate Leeman",
        position: "Head of Product, Designer",
        quote: "I love how agntix helps me track my expenses and alerts me about upcoming bills. It's a must have app!",
        rating: 5
    },
    {
        id: 29,
        avatar: testimonial1,
        name: "Kate Leeman",
        position: "Head of Product, Designer",
        quote: "I love how agntix helps me track my expenses and alerts me about upcoming bills. It's a must have app!",
        rating: 5
    },
    {
        id: 30,
        avatar: testimonial2,
        name: "Kate Leeman",
        position: "Head of Product, Designer",
        quote: "I love how agntix helps me track my expenses and alerts me about upcoming bills. It's a must have app!",
        rating: 5
    },
    {
        id: 31,
        avatar: testimonial3,
        name: "Kate Leeman",
        position: "Head of Product, Designer",
        quote: "I love how agntix helps me track my expenses and alerts me about upcoming bills. It's a must have app!",
        rating: 5
    },
    {
        id: 32,
        avatar: testimonial4,
        name: "Kate Leeman",
        position: "Head of Product, Designer",
        quote: "I love how agntix helps me track my expenses and alerts me about upcoming bills. It's a must have app!",
        rating: 5
    },
    //Home IT Solution testimonial data start
    {
        id: 33,
        avatar: testiImg,
        brandLogo: testiBrand,
        quote: "It uses a directory of over 200 latin words combine a half of model sentence structures. Allgenerations on the internet trends to repeat predefined chunks as nessessary to make this file.",
        name: "Christian B."
    },
    {
        id: 34,
        avatar: testiImg,
        brandLogo: testiBrand,
        quote: "Another great testimonial about how amazing your service is and how it helped our business grow exponentially.",
        name: "Sarah K."
    },
    {
        id: 35,
        avatar: testiImg,
        brandLogo: testiBrand,
        quote: "The best decision we made was choosing this platform. The results have been outstanding and the support is exceptional.",
        name: "Michael T."
    },
    {
        id: 36,
        avatar: testiImg,
        brandLogo: testiBrand,
        quote: "It uses a directory of over 200 latin words combine a half of model sentence structures. Allgenerations on the internet trends to repeat predefined chunks as nessessary to make this file.",
        name: "Christian B."
    },
    {
        id: 37,
        avatar: testiImg,
        brandLogo: testiBrand,
        quote: "Another great testimonial about how amazing your service is and how it helped our business grow exponentially.",
        name: "Sarah K."
    },
    //cripto currency testimonial data start
    {
        id: 38,
        reviewedOn: "reviewed On",
        logo: envatoLogo,
        quote: "“ It uses a directory of over 200 latin words combine a half of model sentence structures. All generations on the internet trends to repeat predefined chunks as nessessary to make this file. ”",
        name: "Christian B.",
        position: "Mid-Level Developer"
    },
    {
        id: 39,
        reviewedOn: "reviewed On",
        logo: envatoLogo,
        quote: "“ It uses a directory of over 200 latin words combine a half of model sentence structures. All generations on the internet trends to repeat predefined chunks as nessessary to make this file. ”",
        name: "Christian B.",
        position: "Mid-Level Developer"
    },
    {
        id: 40,
        reviewedOn: "reviewed On",
        logo: envatoLogo,
        quote: "“ It uses a directory of over 200 latin words combine a half of model sentence structures. All generations on the internet trends to repeat predefined chunks as nessessary to make this file. ”",
        name: "Christian B.",
        position: "Mid-Level Developer"
    },
    //cripto currency testimonial data end

    //startup agency testimonial data start
    {
        id: 41,
        name: 'David Hussey',
        position: 'Co-Founder',
        quote: 'We’ve had good experiences with calling centres through agntix. We hired my own remote team that I have <i>complete control over the remote</i> team that means work from home',
        rating: 5
    },
    {
        id: 42,
        name: 'Kim Armstrong',
        position: 'Co-Founder',
        quote: 'We’ve had good experiences with calling centres through agntix. We hired my own remote team that I have <i>complete control over the remote</i> team that means work from home',
        rating: 5
    },
    {
        id: 43,
        name: 'David Hussey',
        position: 'Co-Founder',
        quote: 'We’ve had good experiences with calling centres through agntix. We hired my own remote team that I have <i>complete control over the remote</i> team that means work from home',
        rating: 5
    },
    {
        id: 44,
        name: 'Kim Armstrong',
        position: 'Co-Founder',
        quote: 'We’ve had good experiences with calling centres through agntix. We hired my own remote team that I have <i>complete control over the remote</i> team that means work from home',
        rating: 5
    },
    //startup agency testimonial data end

    //personal portfolio testimonial data start
    {
        id: 45,
        name: 'Andrew Gross',
        position: 'CEO & Co-Founder',
        rating: 5,
        quote: '"I was really impressed with their speed and how quickly things moved."'
    },
    {
        id: 46,
        name: 'Matthew Blake',
        position: 'Chief Executive Officer',
        rating: 5,
        quote: '"Their speed and swift execution truly impressed me on this project."'
    },
    {
        id: 47,
        name: 'Jonathan Cross',
        position: 'Founder & Chief Executive',
        rating: 5,
        quote: '"I couldn\'t believe how quickly everything came together."'
    },
    {
        id: 48,
        name: 'Benjamin Hayes',
        position: 'CEO & Head of Innovation',
        rating: 5,
        quote: '"I was blown away by how fast and smoothly things moved."'
    },
    {
        id: 49,
        name: 'William Tate',
        position: 'Managing Partner & CEO',
        rating: 5,
        quote: '"I was amazed by their efficiency and how fast everything progressed."'
    },
    {
        id: 50,
        name: 'Jonathan Cross',
        position: 'Founder & Chief Executive',
        rating: 5,
        quote: '"I couldn\'t believe how quickly everything came together."'
    },
    //personal portfolio testimonial data end
    {
        id: 51,
        quote: "“I love working with Samuel – he’s always professional and goes the extra mile to ensure I’m happy.",
        name: "John Deo",
        avatar: userImg1
    },
    {
        id: 52,
        quote: "Working with Amanda has been a joy – she's attentive, talented, and truly cares about delivering great results.",
        name: "James Fox",
        avatar: userImg2
    },
    {
        id: 53,
        quote: "I'm always impressed by Jordan's commitment – he listens, understands, and consistently exceeds expectations.",
        name: "Mark Lee",
        avatar: userImg3
    },
    {
        id: 54,
        quote: "David brings a level of professionalism and passion that's rare – I couldn't be more pleased with the outcome.",
        name: "Paul Ray",
        avatar: userImg4
    },
    {
        id: 55,
        quote: "Noah made everything easy – his calm attitude and expertise kept the project on track and stress-free.",
        name: "Farhan Firoz",
        avatar: userImg5
    },
    {
        id: 56,
        quote: "Olivia's communication and follow-through made a huge difference – I felt supported from start to finish.",
        name: "Jack Day",
        avatar: userImg6
    },
    {
        id: 57,
        quote: "Liam showed true professionalism throughout – always one step ahead and genuinely invested in our success.",
        name: "Ryan Cole",
        avatar: userImg7
    },
    {
        id: 58,
        quote: "Melissa's attention to detail and creative input made the entire process smooth and enjoyable.",
        name: "Brain Lara",
        avatar: userImg3
    },
    {
        id: 59,
        quote: "Emma was patient, responsive, and went out of her way to make sure every detail was perfect.",
        name: "Sam Grey",
        avatar: userImg3
    },
    {
        id: 60,
        quote: "Chris has a great eye for design and was incredibly easy to work with – highly recommended!",
        name: "Alex Stone",
        avatar: userImg3
    },
    {
        id: 61,
        quote: "Working with Amanda has been a joy – she's attentive, talented, and truly cares about delivering great results.",
        name: "Ben Kyle",
        avatar: userImg3
    },
    {
        id: 62,
        quote: "Olivia's communication and follow-through made a huge difference – I felt supported from start to finish.",
        name: "Adam Shaw",
        avatar: userImg3
    }
];
export default testimonialsData;