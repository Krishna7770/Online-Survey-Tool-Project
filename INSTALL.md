This guide explains only the extra steps needed to make Phase 2 work.
If you already ran the Phase 1 React app, this will be very easy.

✅ 1. What You Need Installed

   Open XAMPP Control Panel.

✅ 2. Copy Backend Files to XAMPP

    Inside the project folder you cloned from Git, find the folder:

        backend/

    Copy this entire folder.

    Go to your XAMPP htdocs folder (usually):

        C:\xampp\htdocs\

    Paste the folder there and rename it to:

        online-survey-api

    Final backend path must be:

    C:\xampp\htdocs\online-survey-api\

    Inside this folder you should see:

        bootstrap.php

        getSurvey.php

        dbconfig.template.php

    This is the actual backend that will run.

✅ 3. Create Your Local Database Config

    Inside:

        C:\xampp\htdocs\online-survey-api

    You will find:

        dbconfig.template.php

    Do this:

        Copy it

        Rename the copy to:

        dbconfig.php

    Open dbconfig.php and make sure it looks like:

        <?php
        define('DB_HOST', 'localhost');
        define('DB_USER', 'root'); //default XAMPP user
        define('DB_PASS', '');     //usually empty
        define('DB_NAME', 'onlinesurvey');

    Save it.

✅ 4. Import the Database

    Start Apache and MySQL in XAMPP.

    Open phpMyAdmin:

        http://localhost/phpmyadmin

    Create a new database:

        onlinesurvey

    Click Import    

    Choose the SQL file your teammate (or teacher) provided.

    Click Go to import it.

    After import is complete, you should see tables like:

        questionnaire

        qpage

        qgroup

        qfield

        ftext

        fslider

        fchoice
        (and more)

✅ 5. Test the Backend API

    Open this in your browser:

        http://localhost/online-survey-api/getSurvey.php?qid=1

    If everything works, you will see JSON like:

        { "surveyId": "...", "title": "...", "pages": [ ... ] }

    If you see JSON → backend is working ✔

✅ 6. Run the Frontend (same as Phase 1)

    If Phase 1 was already working for you, just run:

    npm run dev


    Open the shown URL (usually):

    http://localhost:5173


    The frontend will now automatically load questions from your MySQL database via:

    http://localhost/online-survey-api/