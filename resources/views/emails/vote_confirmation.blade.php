<!DOCTYPE html>
<html>

<head>
    <title>Vote Confirmation</title>
</head>

<body>
    <h1>Vote Confirmation</h1>
    <p>Dear {{ $user->name }},</p>
    <p>Thank you for voting in the <span class="font-bold">{{ $election->title }}</span> election.</p>

    <p class="mt-5">Regards,</p>
    <p class="font-bold">STI College Bacoor SHS Council</p>
</body>

</html>