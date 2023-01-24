<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "order_request".
 *
 * @property int $id
 * @property string $item_name
 * @property int $height
 * @property int $weight
 * @property string $picked_date
 * @property string $picked_time
 * @property string $pickedup_location
 * @property string $delivery_location
 * @property string $customer_notes
 * @property string|null $driver_notes
 * @property string|null $driver_name
 * @property int|null $driver_id
 * @property int|null $customer_id
 * @property int|null $order_status
 * @property string|null $status_name
 * @property string|null $created_on
 */
class OrderRequest extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'order_request';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['item_name', 'height', 'weight', 'picked_date', 'picked_time', 'pickedup_location', 'delivery_location', 'customer_notes'], 'required'],
            [['height', 'weight', 'driver_id', 'customer_id', 'order_status'], 'integer'],
            [['pickedup_location', 'delivery_location', 'customer_notes', 'driver_notes','order_ref'], 'string'],
            [['created_on','order_ref','delivery_date','delivery_time'], 'safe'],
            [['item_name', 'picked_date', 'driver_name'], 'string', 'max' => 100],
            [['picked_time', 'status_name'], 'string', 'max' => 50],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'item_name' => 'Item Name',
            'height' => 'Height',
            'weight' => 'Weight',
            'picked_date' => 'Picked Date',
            'picked_time' => 'Picked Time',
            'pickedup_location' => 'Pickedup Location',
            'delivery_location' => 'Delivery Location',
            'customer_notes' => 'Customer Notes',
            'driver_notes' => 'Driver Notes',
            'driver_name' => 'Driver Name',
            'driver_id' => 'Driver ID',
            'customer_id' => 'Customer ID',
            'order_status' => 'Order Status',
            'status_name' => 'Status Name',
            'created_on' => 'Created On',
        ];
    }
    public static function generateID($length=6)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return "#MIT".strtoupper($randomString);
    }

    public function fields()
    {
        $fields = parent::fields();
        $fields['driverDetails'] = function () {
            return $this->driver;
        };
        $fields['customerDetails'] = function () {
            return $this->customer;
        };
        $fields['logs'] = function () {
            return $this->logs??[];
        };
        return $fields;
    }

    public function getDriver()
    {
        return $this->hasOne(User::className(), ['id' => 'driver_id']);
    }
    public function getCustomer()
    {
        return $this->hasOne(User::className(), ['id' => 'customer_id']);
    }
    public function getLogs()
    {
        return $this->hasMany(OrderLog::className(), ['order_id' => 'id']);
    }
}
