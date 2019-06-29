<?php

// $msg = null;

        
    // $nombre = htmlspecialchars($_POST["usuario"]['nombre']);
    $nombre = utf8_decode($_POST['nombre']);
    $telefono = $_POST['telefono'];
    $domicilio = utf8_decode($_POST['domicilio']);
    $nombreesc = utf8_decode($_POST['nombreesc']);
    $Mailintereses = utf8_decode($_POST['Mailintereses']);
    $Mailaptitudes = utf8_decode($_POST['Mailaptitudes']);
    $email = utf8_decode($_POST['email']);
    $Facultad="testvocacionaluaa@gmail.com";


    $mensaje = utf8_decode("Nombre: "). $nombre;
    $mensaje .= utf8_decode("\nCorreo electrónico: "). $email;
    $mensaje .= utf8_decode("\nTeléfono: "). $telefono;
    $mensaje .= utf8_decode("\nDomicilio: "). $domicilio;
    $mensaje .= utf8_decode("\nEscuela de procedencia: "). $nombreesc;
    $mensaje .= "\n\nEn base a tus intereses tus opciones son: \n". $Mailintereses;
    $mensaje .= "\n\nEn base a tus aptitudes tus opciones son: \n". $Mailaptitudes;

    mail($email, "Resultados de Test UAA", $mensaje);
    mail($Facultad, "Info. de test vocacional UAA", $mensaje);
    
    // include_once "phpmailer/PHPMailerAutoload.php";
    // echo ("Entro");

    // $mail = new PHPMailer;
      
    // //indico a la clase que use SMTP
    // $mail->IsSMTP();
      
    // //permite modo debug para ver mensajes de las cosas que van ocurriendo
    // //$mail->SMTPDebug = 2;

    // //Debo de hacer autenticación SMTP
    // $mail->SMTPAuth = true;
    // $mail->SMTPSecure = "ssl";

    // //indico el servidor de Gmail para SMTP
    // $mail->Host = "smtp.gmail.com";

    // //indico el puerto que usa Gmail
    // $mail->Port = 465;

    // //indico un usuario / clave de un usuario de gmail
    // $mail->Username = "testvocacionaluaa@gmail.com";
    // $mail->Password = "Admintestuaa";
 
    // $mail->From = "testvocacionaluaa@gmail.com";
  
    // $mail->FromName = "Administrador - Test Vocacional UAA";
  
    // $mail->Subject = "Resultados de test vocacional UAA";
  
    // $mail->addAddress($email, $nombre);
  
    // $mail->MsgHTML($mensaje);
            
        
    // if($mail->Send())
    // {
    //   $msg= "En hora buena el mensaje ha sido enviado con exito a $email";
    // }
    // else
    // {
    //   $msg = "Lo siento, ha habido un error al enviar el mensaje a $email";
    // }

    // echo $msg;
?>