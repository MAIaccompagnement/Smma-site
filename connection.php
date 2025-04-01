<?php
session_start();
$bdd = new PDO('mysql:localhost;dbname=espace_membre;charset=utf8;', 'root', '');
if(isset($_POST['envoi'])){
    if(!empty($_POST['pseudo']) and !empty($_POST['motdepasse'])){
       $pseudo = htmlspecialchars($_POST['pseudo']);
       $motdepasse = hash("PASSWORD_ARGON2ID",$_POST['motdepasse']);

       $recupuser = $bdd->prepare("INSERT INTO users where pseudo = ? and motdepasse = ?");
       $recupuser->execute(array($pseudo, $motdepasse));

         if($recupuser->rowCount() > 0){
            $_SESSION['pseudo'] = $pseudo;
            $_SESSION['motdepasse'] = $motdepasse;
            $_SESSION['id'] = $recupuser->fetch()['id'];
            echo $_SESSION['id'];

         }else{
            echo "Votre pseudo ou mot de passe est incorrect";
    }else{
            echo "Veuillez compléter tous les champs";
        }
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
     <form method="post" action="" align="center">

        <input type="text" name="pseudo" autocomplete="off">
        <br>
        <input type="password" name="motdepasse" autocomplete="off">
        <br><br>
        <input type="submit" value="envoi">
     </form>
</body>
</html>