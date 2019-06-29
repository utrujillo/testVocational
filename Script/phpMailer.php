<?php

// $msg = null;

        
    // $nombre = htmlspecialchars($_POST["usuario"]['nombre']);
    $nombre = utf8_decode($_POST['nombre']);
    $telefono = $_POST['telefono'];
    $domicilio = utf8_decode($_POST['domicilio']);
    $nombretutor = utf8_decode($_POST['nombretutor']);
    $Mailintereses = utf8_decode($_POST['Mailintereses']);
    $Mailaptitudes = utf8_decode($_POST['Mailaptitudes']);
    $email = utf8_decode($_POST['email']);
    // $Facultad="zuriel2005@hotmail.com";


    $mensaje = utf8_decode("Nombre: "). $nombre;
    $mensaje .= utf8_decode("\nCorreo electrónico: "). $email;
    $mensaje .= utf8_decode("\nTeléfono: "). $telefono;
    $mensaje .= utf8_decode("\nDomicilio: "). $domicilio;
    $mensaje .= utf8_decode("\nNombre del tutor: "). $nombretutor;
    $mensaje .= "\nResultado de intereses: ". $Mailintereses;
    $mensaje .= "\nResultado de aptitudes: ". $Mailaptitudes;

    // mail($email, "Resultados de Test UAA", $mensaje);
    // mail($Facultad, "Info. de test vocacional UAA", $mensaje);
    
    require_once 'phpmailer/class.phpmailer.php';

    $mail = new PHPMailer();

    $mail->From = "testvocacionaluaa@gmail.com";
  
    $mail->FromName = "Administrador - Test Vocacional UAA";

    $mail->addAddress($email, $nombre);
  
    $mail->Subject = "Resultados de test vocacional UAA";
  
    $mail->IsHTML(true);

    //indico a la clase que use SMTP
    $mail->IsSMTP();
      
    //indico el servidor de Gmail para SMTP
    $mail->Host = "ssl://smtp.gmail.com";
    // //indico el puerto que usa Gmail
    $mail->Port = 465;
     // //Debo de hacer autenticación SMTP
    $mail->SMTPAuth = true;
    // $mail->SMTPSecure = "ssl";

     // //indico un usuario / clave de un usuario de gmail
    $mail->Username = "testvocacionaluaa@gmail.com";
    $mail->Password = "Admintestuaa";

    // //permite modo debug para ver mensajes de las cosas que van ocurriendo
    // //$mail->SMTPDebug = 2;

    // $mail->MsgHTML($mensaje);
            
        
    if(!$mail->Send())
    {
      echo'Error' . $mail->ErrorInfo;
      // $msg= "En hora buena el mensaje ha sido enviado con exito a $email";
    }
    else
    {
        echo 'Mail enviado.'.
      // $msg = "Lo siento, ha habido un error al enviar el mensaje a $email";
    }

    // echo $msg;
?>