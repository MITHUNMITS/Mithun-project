<?php

namespace app\controllers;

use app\models\OrderLog;
use app\models\OrderRequest;
use app\models\User;
use yii\web\Response;
use Yii;
use ErrorException;
class ApiController extends \yii\web\Controller
{

    public function behaviors()
    {
        return [
            'corsFilter' => [
                'class' => \yii\filters\Cors::class,
            ],
        ];
    }
    public function actionIndex()
    {
        return "haiii";
    }

//This code is checking if the email and password provided are valid, then returning limited user details.
    public function actionLogin()
    {
        $posted_data = Yii::$app->request->post();
        $email = $posted_data["email"]??"";
        $password = $posted_data["password"]??"";
        if(!$email || !$password) {
            throw  new ErrorException('Wrong Email / USER ID / Password');
        }
        $user = User::findOne(["email"=>$email]);
        if ($user->password != '') {
            if (!$user->validatePassword($password))
                throw  new ErrorException('Wrong Email / USER ID / Password');
        }
        return $user->limitedDetails();
    }
//This code creates a new order request and sets default values for its attributes.
    public function actionAddRequest()
    {
        $posted_data = Yii::$app->request->post();
        $order = new OrderRequest();
        if ($order->load($posted_data, '')) {
            $order->status_name="Awaiting Conformation";
            $order->order_status=1;
            $order->created_on=date('Y-m-d H:i:s');
            $order->order_ref = OrderRequest::generateID(6);
            $order->order_status=1;
            $order->delivery_date=" - ";
            $order->delivery_time=" - ";
            $order->save(false);
            return $order;
        }
        return true;
    }
//This code retrieves all data from the OrderRequest model and returns it.
    public function actionLoadData()
    {
        $posted_data = Yii::$app->request->post();
        $data = OrderRequest::find()->all();
        return $data;
    }
//This code retrieves data from the OrderRequest table based on the ID provided in the request.
    public function actionLoadDetails()
    {
        $id = Yii::$app->request->post("id");
        $data = OrderRequest::findOne(["id"=>$id]);
        return $data;
    }
//This code updates the details of an order and saves logs associated with it.
    public function actionUpdateDetails()
    {
        $posted_data = Yii::$app->request->post();
        $id = Yii::$app->request->post("id");
        $order = OrderRequest::findOne(["id"=>$id]);
        if ($order && $order->driver_id && $order->driver_id!=$posted_data["driver_id"]) {
            throw  new ErrorException('Parcel Already taken');
        }
        if ($order) {
            if ($order->load($posted_data, '')) {
               
                if ($order->save(false)) {
                    if ($posted_data["logs"]) {
                        OrderLog::deleteAll(["order_id"=>$id]);
                        foreach ($posted_data["logs"] as $logs) {
                            $loModal = new OrderLog();
                            $loModal->date = date('Y-m-d H:i:s');
                            $loModal->message = $logs["message"];
                            $loModal->order_id = $id;
                            $loModal->save(false);
                        }
                    }
                }
            }
        }
        return true;
    }
//This code is retrieving data from the User and OrderRequest tables to create a dashboard for the user depending on their type.
    public function actionLoadDashboard()
    {
        $result = [];
        $id = Yii::$app->request->post("id");
        $user = User::findOne(["id"=>$id]);
        if ($user) {
            if ($user->type==1) {
                $count = OrderRequest::find()->where(["customer_id"=>$user->id, "order_status"=>1])->andWhere(['driver_id' => null])->count();
                $result[] = ["title"=>"Total Pending","value"=>$count];
                $count = OrderRequest::find()->where(["customer_id"=>$user->id])->andWhere(['<>','order_status',1])->andWhere(['<>','order_status',0])->count();
                $result[] = ["title"=>"Total Active","value"=>$count];
                $count = OrderRequest::find()->where(["customer_id"=>$user->id,"order_status"=>3])->count();
                $result[] = ["title"=>"Ready for Pick-Up","value"=>$count];
                $count = OrderRequest::find()->where(["customer_id"=>$user->id, "order_status"=>0])->count();
                $result[] = ["title"=>"Total Completed","value"=>$count];
                $count = OrderRequest::find()->where(["customer_id"=>$user->id, "order_status"=>0])->count();
            } else if ($user->type==2) {
                $count = OrderRequest::find()->where(["driver_id"=>$user->id])->andWhere(['<>','order_status',1])->andWhere(['<>','order_status',0])->count();
                $result[] = ["title"=>"Active Parcels","value"=>$count];
                $count = OrderRequest::find()->where(["driver_id"=>$user->id,"order_status"=>3])->count();
                $result[] = ["title"=>"Ready for Pick-Up","value"=>$count];
                $count = OrderRequest::find()->where(["driver_id"=>$user->id,"order_status"=>3])->count();
                $result[] = ["title"=>"Way to Drop-Off","value"=>$count];
                $count = OrderRequest::find()->where(["driver_id"=>$user->id, "order_status"=>5])->count();
                $result[] = ["title"=>"Total Completed","value"=>$count];
            }
        }

        return $result;
    }



}
