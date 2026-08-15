# Student Learning Diary - Tailwind CSS Hero Page

Author: Student
Date: August 2026

## What I Learned:
1. **Relative vs Absolute Positioning**:
   - I learned that when placing children elements absolutely (absolute), they are positioned based on the nearest ancestor that has relative positioning.
   - For example, the parent dashboard preview container uses relative max-w-4xl mx-auto h-[450px] so that all of the floating info cards (Tasks, Project Status, Team Activity) are positioned precisely relative to the center workspace area, rather than relative to the entire webpage canvas.
   - For the CTA buttons, I used a relative parent block (relative w-[340px] h-12) so the absolute buttons (absolute left-0 and absolute right-0) align correctly inside that box.
2. **Sticky Positioning**:
   - I used sticky top-0 z-50 on the nav bar. sticky means the bar flows normally in the document, but stops at the top of the viewport when scrolling. z-50 ensures it sits on top of all other absolute elements when scrolling down.
3. **Fixed Position**:
   - The chat bubble uses fixed bottom-6 right-6 z-50. Fixed means it is positioned relative to the browser viewport itself and stays in the same place even when the user scrolls the page.

## Struggles and Challenges:
- **Redundant Block Classes**: I initially added block classes to elements like div, p, and h1. Later, I realized that these elements are already block-level by default in HTML, so adding block utility classes is redundant.
- **Positioning Alignment**: I struggled with getting the dashboard image in the center. I ended up using absolute left-1/2 -translate-x-1/2 which moves it to the half mark of the screen, and then shifts it back by half its own width to center it.
