# FlowAp Student Project Diary

I am writing this diary to show how I built this project step by step.

## Step 1: Nav Bar
I built the nav bar first. I wanted it to look like it floats, so I used absolute position and backdrop-blur-md for glassmorphism.
I added a responsive hamburger menu. I had to write a simple javascript function to toggle the mobile menu div.

## Step 2: Hero Layout & Animations
I added the hero section. To make it flashy, I added custom keyframes inside my tailwind config at the top. I struggled with keyframes for the morphing blob, but got the borders border-radius morphing in a loop.
I also added absolute orbs with blur to float in the background.
For the 3D effect on the dashboard image, I used CSS perspective and hover rotate transitions.

## Step 3: Bento Grid Features
The features section needed 6 cards with different sizes. I used Tailwind grid-cols-6 columns.
- Card 1 (AI Automation): Span 4
- Card 2 (Speed Performance): Span 2
- Card 3 (Securty Systems): Span 2
- Card 4 (Analytics Graphs): Span 4
- Card 5 (Seamless Sync): Span 3
- Card 6 (Colaboration Tools): Span 3

## Step 4: Testimonials, CTA and Footer
I added 3 glass cards for reviews.
Then I added the Call-To-Action block with a purple gradient background.
Finally, I built a 4-column footer with social links.
