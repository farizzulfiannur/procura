<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'name' => 'PIC Proses',
                'description' => 'Mengelola proses pengadaan'
            ],
            [
                'name' => 'Executive',
                'description' => 'Melakukan persetujuan pengadaan'
            ],
            [
                'name' => 'Pengguna',
                'description' => 'Mengajukan Purchase Request'
            ],
            [
                'name' => 'Vendor',
                'description' => 'Mengikuti proses pengadaan'
            ]
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(
                ['name' => $role['name']],
                ['description' => $role['description']]
            );
        }
    }
}
