import { TeamMember } from "@/types/team-d-t";
import team1 from "../../public/assets/img/home-02/team/team-1.jpg";
import team2 from "../../public/assets/img/home-02/team/team-2.jpg";
import team3 from "../../public/assets/img/home-02/team/team-3.jpg";
import team4 from "../../public/assets/img/home-02/team/team-5.jpg";
import team5 from "../../public/assets/img/home-03/team/team-1.jpg";
import team6 from "../../public/assets/img/home-03/team/team-2.jpg";
import team7 from "../../public/assets/img/home-03/team/team-3.jpg";
import team8 from "../../public/assets/img/home-03/team/team-4.jpg";

// Import all team images for about us page
import team15 from '../../public/assets/img/about-us/about-us-4/team/team-1.jpg';
import team16 from '../../public/assets/img/about-us/about-us-4/team/team-2.jpg';
import team17 from '../../public/assets/img/about-us/about-us-4/team/team-3.jpg';
import team18 from '../../public/assets/img/about-us/about-us-4/team/team-4.jpg';
import team19 from '../../public/assets/img/about-us/about-us-4/team/team-5.jpg';

const teamMembersData: TeamMember[] = [
  {
    id: 1,
    since: "Since 2009",
    name: "Logan Dang",
    position: "CEO Founder",
    image: team1,
    link: "/team-details-light"
  },
  {
    id: 2,
    since: "Since 2004",
    name: "Rahat Chowhury",
    position: "Web Designer",
    image: team2,
    link: "/team-details-light",
  },
  {
    id: 3,
    since: "Since 2012",
    name: "Thomas Finlan",
    position: "Marketing Director",
    image: team3,
    link: "/team-details-light",
  },
  {
    id: 4,
    since: "Since 2010",
    name: "Shagor Mahmud",
    position: "UI/UX Designer",
    image: team4,
    link: "/team-details-light",
  },
  {
    id: 5,
    since: "Since 2016",
    name: "Billy Craft",
    position: "Motion Designer",
    image: team2,
    link: "/team-details-light",
  },
  //team data
  {
    id: 6,
    name: "Ethan Roberts",
    position: "Marketing Leader",
    image: team5,
    link: "/team-details-light",
    socialLinks: {
      facebook: "#",
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    id: 7,
    name: "Alex Jamie",
    position: "Marketing Leader",
    image: team6,
    link: "/team-details-light",
    socialLinks: {
      facebook: "#",
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    id: 8,
    name: "Taylor Same",
    position: "Marketing Leader",
    image: team7,
    link: "/team-details-light",
    socialLinks: {
      facebook: "#",
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    id: 9,
    name: "Yoyo Casey",
    position: "Marketing Leader",
    image: team8,
    link: "/team-details-light",
    socialLinks: {
      facebook: "#",
      twitter: "#",
      linkedin: "#"
    }
  },
  //home-6 creative agency light data start
  {
    id: 10,
    name: "Andrew",
    position: "Developer",
    image: "/assets/img/home-06/team/team-1.jpg",
    className: "studio-team-thumb-1",
    colClass: "col-md-6 col-sm-6",
    wrapClass: "mt-160",
    mbClass: "mb-120",
    link: "/team-details-light",
  },
  {
    id: 11,
    name: "Sophia",
    position: "Developer",
    image: "/assets/img/home-06/team/team-2.jpg",
    className: "studio-team-thumb-3",
    colClass: "col-md-6 col-sm-6",
    wrapClass: "text-xl-end",
    mbClass: "mb-120",
    link: "/team-details-light",
  },
  {
    id: 12,
    name: "Emma",
    position: "Developer",
    image: "/assets/img/home-06/team/team-3.jpg",
    className: "studio-team-thumb-2",
    colClass: "col-md-6 col-sm-6",
    wrapClass: "mt-160",
    mbClass: "mb-120",
    link: "/team-details-light",
  },
  {
    id: 13,
    name: "James",
    position: "Developer",
    image: "/assets/img/home-06/team/team-4.jpg",
    className: "studio-team-thumb-4",
    colClass: "col-md-6 col-sm-6",
    wrapClass: "text-xl-end",
    mbClass: "mb-120",
    link: "/team-details-light",
  },
  {
    id: 14,
    name: "Oliver",
    position: "Developer",
    image: "/assets/img/home-06/team/team-5.jpg",
    className: "studio-team-thumb-1",
    colClass: "col-md-6 col-sm-6",
    wrapClass: "mt-160",
    mbClass: "mb-120",
    link: "/team-details-light",
  },
  {
    id: 15,
    name: "Charlotte",
    position: "Developer",
    image: "/assets/img/home-06/team/team-6.jpg",
    className: "studio-team-thumb-3",
    colClass: "col-md-6 col-sm-6",
    wrapClass: "text-xl-end",
    mbClass: "mb-120",
    link: "/team-details-light",
  },
  //home-6 creative agency light data end
  //about us inner page team data
  {
    id: 16,
    image: team15,
    name: 'Andrew',
    position: 'Developer',
    link: '/team-details-light'
  },
  {
    id: 17,
    image: team16,
    name: 'Sophia',
    position: 'Developer',
    link: '/team-details-light'
  },
  {
    id: 18,
    image: team17,
    name: 'Emma',
    position: 'Developer',
    link: '/team-details-light'
  },
  {
    id: 19,
    image: team18,
    name: 'James',
    position: 'Developer',
    link: '/team-details-light'
  },
  {
    id: 20,
    image: team19,
    name: 'Oliver',
    position: 'Developer',
    link: '/team-details-light'
  },
  {
    id: 21,
    image: team16,
    name: 'Sophia',
    position: 'Developer',
    link: '/team-details-light'
  },
  {
    id: 22,
    image: team17,
    name: 'Emma',
    position: 'Developer',
    link: '/team-details-light'
  }
  //about us inner page team data end
];

export default teamMembersData;