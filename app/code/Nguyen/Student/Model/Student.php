<?php
namespace Nguyen\Student\Model;

use Magento\Framework\Model\AbstractModel;

class Student extends AbstractModel
{
    protected function _construct()
    {
        $this->_init(\Nguyen\Student\Model\ResourceModel\Student::class);
    }
}