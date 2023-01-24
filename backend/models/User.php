<?php

namespace app\models;

use ErrorException;
use Yii;
use yii\helpers\ArrayHelper;

/**
 * This is the model class for table "user".
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string|null $phone
 * @property string $password
 *  @property string $type
 */
class User extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'user';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name', 'email', 'password','type'], 'required'],
            [['password'], 'string'],
            [['licence','status'], 'safe'],
            [['name', 'email', 'phone'], 'string', 'max' => 50],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'email' => 'Email',
            'phone' => 'Phone',
            'password' => 'Password',
        ];
    }
    public function validatePassword($password)
    {
        return Yii::$app->security->validatePassword($password, $this->password);
    }
    public function limitedDetails()
    {
        return[
            "id"=>$this->id,
            "name"=>$this->name,
            "email"=>$this->email,
            "phone"=>$this->phone,
            "type"=>$this->type,
            "licence"=>$this->licence,
        ];
    }
}
