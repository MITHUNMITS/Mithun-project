<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "order_log".
 *
 * @property int $id
 * @property int $order_id
 * @property string $message
 * @property int $status
 */
class OrderLog extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'order_log';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['order_id', 'message'], 'required'],
            [['order_id', 'status'], 'integer'],
            [['message'], 'string'],
            [['date'], 'safe'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'order_id' => 'Order ID',
            'message' => 'Message',
            'status' => 'Status',
        ];
    }
}
