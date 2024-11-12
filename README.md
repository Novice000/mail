# Mail - CS50W Project 3

A web application that simulates an email client, built as part of Harvard's CS50W course. This project allows users to send, receive, and archive emails, featuring inbox and sent mail views, as well as a compose email form.

## Features

- **Inbox, Sent, and Archived Mail Views**: Users can navigate between inbox, sent, and archived mail folders.
- **Compose Email**: Users can compose new emails and send them to one or multiple recipients.
- **View Email**: Clicking on an email displays its full content.
- **Read and Archive/Unarchive Email**: Emails can be marked as read or archived/unarchived.
- **Reply Functionality**: Users can reply to emails directly from the email view.

## Technologies Used

- **JavaScript**: Custom JavaScript was written to handle page navigation, form submissions, and interactions with the backend API.
- **CSS**: Custom CSS was used for styling the application interface.
- **HTML**: Basic HTML structure for UI components.
- **Python/Django**: Backend was provided by the CS50W course to handle email functionality and data storage.

## My Contributions

All JavaScript and CSS for this project were written by me. This includes:

- Implementing client-side logic for form handling, email view toggling, and data fetching.
- Designing the user interface's visual style, including colors, layout, and responsive adjustments.

## Setup Instructions

1. Clone the repository to your local machine.
    ```bash
    git clone <repository_url>
    ```
2. Navigate into the project directory.
    ```bash
    cd mail
    ```
3. Install required packages:
    ```bash
    pip install -r requirements.txt
    ```
4. Run the Django development server.
    ```bash
    python manage.py runserver
    ```
5. Open the application in your web browser at `http://127.0.0.1:8000/`.

## Project Structure

- **mail/static/mail**: Contains `styles.css` (CSS file) and `inbox.js` (JavaScript file).
- **mail/templates/mail**: Contains the HTML templates for rendering views.
- **mail/views.py**: Backend views for handling API requests.

## Acknowledgments

This project was completed as part of Harvard's CS50W course, and the backend Django setup was provided by the course. All JavaScript and CSS code, however, was created by me.

## License

This project is for educational purposes and follows the guidelines of Harvard's CS50 course. It is licensed for non-commercial use only.
