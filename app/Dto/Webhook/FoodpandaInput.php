<?php

namespace App\Dto\Webhook;

use App\Http\Controllers\Controller;
use Carbon\Carbon;

class FoodpandaInput extends Controller
{
    private const EXPEDITION_TYPE = [
        'DELIVERY' => '配達代行',
        'PICKUP' => 'ピックアップ'
    ];

    private const STATUS = [
        'UNASSIGNED' => '新規注文',
        'RECEIVED' => '新規注文',
        'READY_FOR_PICKUP' => '準備完了',
        'DISPATCHED' => '配達中',
        'DELIVERED' => '配達完了',
        'CANCELLED' => 'キャンセル済',
    ];

    public string $foodpanda_order_id;
    public string $foodpanda_store_id;
    public string $order_number;
    public string $phone;
    public string $name;
    public string $address;
    public string $status;
    public int $total;
    public int $fee;
    public int $discount;
    public string $service_type;
    public string $expedition_type;
    public bool $is_disposable;
    public string $payment_method;
    public string $comment;
    public Carbon $ordered_at;
    public array $order_details;

    /**
     * @param array $data
     */
    public function __construct(array $data)
    {
        $this->foodpanda_order_id = $data['order_id'];
        $this->foodpanda_store_id = $data['client']['store_id'];
        $this->order_number = $data['order_code'];

        $customer = $data['customer'];
        $this->phone = $customer['phone_number'];
        $this->name = $customer['last_name'] . ' ' . $customer['first_name'];
        $this->address = $this->createAddress($customer['delivery_address']);
        $this->status = self::STATUS[$data['status']]; // 固定
        $this->total = $data['payment']['order_total'];
        $this->fee = $data['payment']['delivery_fee'] + $data['payment']['service_fee'];
        $this->discount = $data['payment']['discount'] + ($data['payment']['discounts']) ?? 0;
        $this->service_type = 'foodpanda'; // 固定
        $this->expedition_type = self::EXPEDITION_TYPE[$data['order_type']];
        $this->is_disposable = $data['payment']['container_charge'] > 0;
        $this->payment_method = $data['payment']['type'] ?? '';
        $this->comment = 'あとで作る';
        $this->ordered_at = $this->parseDateTime($data['sys']['created_at']);
        $this->order_details = $this->createOrderDetails($data);
    }

    /**
     * @param array $data
     * @return array
     */
    private function createOrderDetails(array $data): array
    {
        $items = $data['items'];
        $order_details = [];
        foreach ($items as $item) {
            $order_details[] = [
                'foodpanda_item_id' => $item['_id'],
                'name' => $item['name'],
                'price' => $item['pricing']['unit_price'],
                'quantity' => $item['pricing']['quantity'],
//                'instructions' => $item['instructions'],
            ];
        }
        return $order_details;
    }

    /**
     * 住所の配列から文字列を生成
     * @param array $address
     * @return string
     */
    private function createAddress(array $address): string
    {
        return $address['zipcode'] . ' ' . $address['country'] . ' ' . $address['city'] . ' ' . $address['street'] . ' ' . $address['number'] . ' ' .
            $address['company'] . ' ' . $address['block'] . ' ' . $address['building'] . ' ' . $address['apartment'] . ' ' .
            $address['entrance'] . ' ' . $address['intercom'] . ' ' . $address['floor'] . ' ' . $address['suburb'];
    }

    /**
     * 2022-01-02T10:21:22.168753803Z
     * @param string $date_time
     * @return Carbon
     */
    private function parseDateTime(string $date_time): Carbon
    {
        $date = explode('T', $date_time);
        $time = explode('.', $date[1]);
        return Carbon::createFromFormat('Y-m-d H:i:s', $date[0] . $time[0], 'UTC')->setTimezone('Asia/Tokyo');
    }
}
